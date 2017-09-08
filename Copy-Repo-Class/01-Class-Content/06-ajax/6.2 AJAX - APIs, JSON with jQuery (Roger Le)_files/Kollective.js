// These are background facts on how Kollective works in terms of our viewer. We register our videos with a Kollective
// service, server side and then get an .m3u8 from the service that we can play back in our player. That .m3u8 is fed
// through their local service through either http or https endpoint. This code handles detection of the agent,
// continuously polling the service, and building the proper playback url.

var Panopto = Panopto || {};
Panopto.Viewer = Panopto.Viewer || {};
Panopto.Viewer.Constants = Panopto.Viewer.Constants || {};
Panopto.Viewer.FlashLongPoll = Panopto.Viewer.FlashLongPoll || {};

Panopto.Viewer.Kollective = (function (Kollective) {
    // Namespace imports
    var Constants = Panopto.Viewer.Constants;

    // Detect if the user has the special query string to turn off broadcast optimization
    var query = Panopto.Core.StringHelpers.parseQueryString(window.location.search.slice(1));
    var optimizationEnabled = query.P2POptimization !== 'disabled';

    // Pattern that we need to use to call the agent long poll url, will be filled in before long poll run
    var longPollUrlPattern;

    // Returns true if Kollective is enabled for this source, checks if optimization is enabled, if Kollective is
    // enabled, and if optimizationToken is not null.
    var isKollectiveOptimized = function (optimizationToken) {
        return optimizationEnabled && Panopto.viewer.isKollectiveEnabled && optimizationToken;
    };

    // Pull out the ktoken component from the Kollective url, should only be one as this won't correctly handle
    // duplicate ktoken arguments on the optimization url.
    var parseKtoken = function (optimizationToken) {
        return optimizationToken.split("ktoken=")[1].split("&")[0];
    };

    // Attempt to detect the Kollective agent on the client's machine, if the agent is found it will check if the
    // version is at least the minimum version. Regardless of if the correct agent is detected it will trigger the
    // callback after setting if the agent is detected or not.
    //
    // Everything is wrapped in a try/catch loop to make sure that we fallback in case something bad happens
    var detectAgent = function (detectCallback) {
        var kontikiAgentParams = {
            callback: function (ka) {
                var agentDetected = false;
                try {
                    agentDetected = ka
                        && ka.isInstalled()
                        && ka.checkMinVersion(Panopto.viewer.kollectiveMinimumVersion)

                    if (!agentDetected) {
                        console.log(ka.getAgentDetectionLog());
                    }
                }
                catch (exception) {
                    agentDetected = false;
                    console.log(exception);
                }
                finally {
                    detectCallback(agentDetected);
                }
            },
            flash_loader_url: Panopto.appRoot + "/Scripts/Kollective/flash/kontikiagentflashloader-3.swf",
            use_ajax: true,
            use_jsonp: true,
            use_ssl: true,
            callback_timeout: Panopto.viewer.kollectiveClientDetectionTimeout,
        };

        try {
            kontikiAgent = new KontikiAgent(kontikiAgentParams);
        }
        catch (exception) {
            console.log(exception);
            detectCallback(false);
        }
    };

    // Attempts to load the optimized stream into the player (FlowPlayer, VideoJS). When it gets back the token and
    // the long poll succeeds it will load the optimized stream. Otherwise if it senses and error it will load the
    // fallback stream.
    var tryLoadOptimizedStream = function (optimizationToken, component, onSuccess, onFallback, bufferingCallback) {
        if (isKollectiveOptimized(optimizationToken)) {

            // Gets the current manifest once the long poll gets a good response, continue to have retry logic as the
            // manifest will not always respond even when the long poll manifest progress is at 100.
            var longPollCallback = function () {
                $.ajax({
                    url: optimizationToken,
                    tryCount: 0,
                    success: function () {
                        loadStream(component, onSuccess, bufferingCallback);
                    },
                    error: function (xhr) {
                        // "this" refers to the ajax call itself and allows us to track how many times we have tried it.
                        longPollCallbackError(this, xhr, component, onFallback, bufferingCallback);
                    }
                });
            };

            if (Panopto.viewer.useKollectiveFlashLongPoll)
            {
                // Use Flash-based long-poll API

                // Bring up waiting cursor. It will go away once stream is loaded.
                bufferingCallback(true);

                // Build the params for the flash long poll bridge
                FlashLongPoll.start({
                    optimizationToken: optimizationToken,
                    ktoken: parseKtoken(optimizationToken),
                    callback: function (command, numErrorsInARow) {
                        return processAgentCommand(
                            command,
                            numErrorsInARow,
                            longPollCallback,
                            onFallback,
                            bufferingCallback);
                    }
                });
            }
            else if (Panopto.viewer.kollectiveSkipLongPoll)
            {
                // Skip long poll operation and load the stream immediately. Use the loadStream method directly as the
                // Citrix VDI environment is having issues loading callbacks.
                loadStream(component, onSuccess, bufferingCallback);
            }
            else
            {
                // Start the long poll process for Kollective, this will handle keeping the agent alive and reacting to
                // commands from the agent.
                longPollUrlPattern = getLongPollUrlPattern(optimizationToken);
                handleLongPoll(0, 0, longPollCallback, onFallback, bufferingCallback);

                // Start the whole sequence with a first request which may or may not succeed, does not have the retry logic
                // as we now depend on the background longpoll to do that for us via listening to manifest progress events.
                // There is a small gap of about 1-2 seconds between when this call starts and the first longpoll comes 
                // back so make sure to show the buffering indicator.
                bufferingCallback(true);
                $.ajax({
                    url: optimizationToken,
                    success: function () {
                        loadStream(component, onSuccess, bufferingCallback);
                    },
                    error: function () {
                        console.log("First Kollective call failed, if long poll also fails fallback.");
                    }
                });
            }        
        }
    };

    // Handles issue where Kollective doesn't work in Edge due to localhost loop security setting, this will show a
    // message and prevent the delivery from ever being loaded.
    var handleEdgeIssue = function () {
        window.location.search += "&{0}=true".format(Constants.ShowKollectiveEdgeMessageParam);
    };

    // If we error out specifically on a Kollective url and with a 404 we need to retry as this is due to the agent
    // not having properly picked up the stream yet and it will soon, else just load the original source
    var longPollCallbackError = function (ajaxCall, xhr, onFallback, bufferingCallback) {

        // Retry if the try count is still below the threshold
        if (xhr.status === 404 && ajaxCall.tryCount < Panopto.viewer.kollectiveM3U8RetryCount) {
            ajaxCall.tryCount += 1;
            $.ajax(ajaxCall);
        }
        else {
            // Turn off the buffering indicator when fallback to our own sources
            bufferingCallback(false);
            onFallback();
        }
    };

    // On a successful request to the Kollective service fire up the player via the callback, in addition there
    // is some Edge specific logic to catch it not working. Only do this if component was supplied because this is
    // a Flash specific and therefore VideoJS specific problem.
    var loadStream = function (component, onSuccess, bufferingCallback) {
        if (component && Panopto.viewer.isKollectiveEnabled && Panopto.Core.Browser.isEdge) {
            var kollectiveTimeoutID = setTimeout(handleEdgeIssue, 10000);
            component.one("loadeddata", function () {
                window.clearTimeout(kollectiveTimeoutID);

                // We found the source okay disable buffering animation
                bufferingCallback(false);
            });
        } else {
            // Turn off the buffering indicator when we get the .m3u8 back successfully
            bufferingCallback(false);
        }
        onSuccess();
    };

    // Parse hostname, protocol, and port out of Kollective url, possibility this fails so log if it does but don't
    // attempt to fail back to anything. Will also attempt to parse out the kToken as that is how the agent keeps
    // track of what you are looking for. Takes 0 and 2 because 1 matches the space in between the double slashes 
    // in url schema.
    //
    // example: https://client.kontiki.com:30158/api/v1/urn:jeremy-moid: ...
    var getLongPollUrlPattern = function (optimizationToken) {
        var fullKollectiveUrlPattern = "";
        try {
            var parsedUrl = optimizationToken.split("/");
            var parsedKtoken = parseKtoken(optimizationToken);
            fullKollectiveUrlPattern = parsedUrl[0] + "//" + parsedUrl[2] + Constants.KollectiveLongPollUrlBase
                + parsedKtoken;
        }
        catch (ex) {
            console.log(ex);
        }

        return fullKollectiveUrlPattern;
    };

    // Handles continuously polling the Kollective agent so that even if we no longer are playing the stream it will
    // continue to load in the agent. This also handles commands from the client and will fallback to our source when
    // the agent indicates any errors and reload the stream if the agent indicates pre roll needs to switchover.
    var handleLongPoll = function (longPollTimestamp, numErrorsInARow, onSuccess, onFallback, bufferingCallback) {
        $.ajax({
            url: longPollUrlPattern.format(longPollTimestamp),
            method: "GET",
            datatype: "json",
            timeout: Panopto.viewer.kollectiveLongPollAjaxTimeout,
            success: function (data) {
                try {
                    var command = JSON.parse(data);
                    numErrorsInARow = processAgentCommand(command, numErrorsInARow, onSuccess, onFallback, bufferingCallback);
                    var haltLongPoll = numErrorsInARow >= Panopto.viewer.kollectiveLongPollErrorThreshold
                        && Panopto.viewer.kollectiveFallbackToSourcePermanently;
                    if (!haltLongPoll && command && command.ts) {
                        newTimestamp = command.ts;
                        setTimeout(
                            function () {
                                handleLongPoll(
                                    newTimestamp,
                                    numErrorsInARow,
                                    onSuccess,
                                    onFallback,
                                    bufferingCallback);
                            },
                            Panopto.viewer.kollectiveLongPollTimeout);
                    }
                } catch (ex) {
                    console.log(ex);
                }
            },
            error: function () {
                setTimeout(
                    function () {
                        handleLongPoll(
                          longPollTimestamp,
                          0,
                          onSuccess,
                          onFallback,
                          bufferingCallback);
                    },
                    Panopto.viewer.kollectiveLongPollTimeout);
            }
        });
    };

    // Process the command coming back from the agent, we recognize the following commands.
    //     1. The manifestProgress event by which we know if the stream is ready to start
    //     2. The switchToCDN event so we know to fallback
    //     3. The cancelStream event so we know to fallback
    //     4. The httpError event so we know to fallback
    // Returns the number of errors it has seen in a row.
    var processAgentCommand = function (command, numErrorsInARow, onSuccess, onFallback, bufferingCallback) {
        if (command && command.cmd === "manifestProgress" && command.params) {
            if (command.params.percent === "100") {
                onSuccess();
            }
            else {
                bufferingCallback(true);
            }
            numErrorsInARow = 0;
        }
        else if (command && command.cmd === "switchToCDN") {
            console.log("Command to switch to CDN.");
        }
        else {

            // Increment the errors seen and fallback if we have exceeded the threshold.
            numErrorsInARow += 1;
            if (numErrorsInARow >= Panopto.viewer.kollectiveLongPollErrorThreshold) {
                console.log("Response from Kollective agent we don't explicitly handle, falling back. " + command.cmd);
                bufferingCallback(false);
                onFallback();
            }
            else {
                // Continue buffering as we haven't exceeded the count yet
                bufferingCallback(true);
            }
        }
        return numErrorsInARow;
    };

    // Expose the public methods
    Kollective.isKollectiveOptimized = isKollectiveOptimized;
    Kollective.detectAgent = detectAgent;
    Kollective.tryLoadOptimizedStream = tryLoadOptimizedStream;
    Kollective.handleEdgeIssue = handleEdgeIssue

    return Kollective;
})(Panopto.Viewer.Kollective || {});