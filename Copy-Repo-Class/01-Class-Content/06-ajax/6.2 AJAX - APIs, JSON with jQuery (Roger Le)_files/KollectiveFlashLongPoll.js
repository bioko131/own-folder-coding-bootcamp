// These are background facts on how Kollective long poll must work within a Flash only environment, such as a Citrix
// VDI environment. For now we have a Flash file from Kollective that instantiates and processes all long poll calls.
// All we have here is the bridge between the two so that we can process it through our regular pipeline.
//
// Adapted from the code supplied to us by John at Kollective. Changed to make failures explicit and to change the
// code to only take used parameters and to align better with our other objects.
// 
// Note: There must be a Global variable named "FlashLongPoll"
var Panopto = Panopto || {};
Panopto.Viewer = Panopto.Viewer || {};

Panopto.Viewer.FlashLongPoll = (function (FlashLongPoll) {

    // Callback we call when we receive back a long poll from the Flash code, includes the success, fallback, and
    // buffering callbacks already. Takes in "command" and "numErrorsInARow" as arguments.
    // No-op for documentation
    FlashLongPoll.callback;

    // The timeout set to make sure the Flash code is run and time out correctly.
    // No-op for documentation
    FlashLongPoll.flashStartTimer;

    // Pattern that we need to use to call the agent long poll url, will be filled in before long poll run, is always
    // going to be an Http url.
    // No-op for documentation
    FlashLongPoll.longPollUrlPattern;

    // Number of long poll errors we have seen in a row, used to figure out if we should error out and fallback.
    FlashLongPoll.numErrorsInARow = 0;

    // Optimization token with Ampersands replaced with encoded version, used because Flash strips Ampersands.
    // No-op for documentation
    FlashLongPoll.prefetchUrl;

    // Last timestamp returned from a successful long poll request.
    FlashLongPoll.timestamp = 0;

    // Start the Flash long poll by parsing information from the main Panopto player and adding some Flash specific
    // changes, takes in a params object that looks like the following.
    // 
    // params: { 
    //     callback = function callback that calls Panopto.Viewer.Kollective.HandleLongPoll with the onSuccess,
    //         onFallback, and bufferingCallback arguments already filled in. Only needs the command and 
    //         numErrorsInARow arguments passed in.
    //     ktoken = parsed ktoken from optimizationToken
    //     optimizationToken = optimizationToken used as a prefetch url in Flash
    //   }
    var start = function (params) {
        FlashLongPoll.callback = params.callback;

        // Format to a http only long poll pattern and encode the ampersands in optimizationToken as Flash drops them
        FlashLongPoll.longPollUrlPattern = "http://127.0.0.1:31013/api/v1/longpoll?ts={0}%26ktoken=" + params.ktoken;
        FlashLongPoll.prefetchUrl = params.optimizationToken.replace(/\&/g, "%26");

        // start the polling
        poll();
    };

    // Poll using the Flash object given to Panopto by Kollective so that it can talk to the Kollective client and pass
    // the command information back to the Panopto code.
    var poll = function () {
        // Set the flash parameters to be the long-poll url and the optimizationToken/prefetchUrl
        var flashParams = {
            longpollUrl: FlashLongPoll.longPollUrlPattern.format(FlashLongPoll.timestamp),
            prefetchUrl: FlashLongPoll.prefetchUrl
        };

        // Allow the Flash object to access script and vice versa
        var flashOptions = { allowscriptaccess: 'always' };

        // Embed the Flash object got from Kollective with the correct callbacks in the page.
        swfobject.embedSWF(
            Panopto.appRoot + "/Scripts/Kollective/flash/kontikiflashlongpoll-v2.swf",
            "kontikiLongPoll",
            "1",
            "1",
            "10.0.0",
            "",
            flashParams,
            flashOptions,
            '',
            function (e) {
                if (e.success) {
                    gKontikiAgentLogs += "Flash long-poll embedded, starting poll on URL " + flashParams.longpollUrl + "\n";
                    // set flash launch timeout
                    FlashLongPoll.flashStartTimer = setTimeout(function () {
                        var msg = "Flash long-poll start time-out";
                        gKontikiAgentLogs += msg + "\n";
                        FlashLongPoll.callback({ error: msg }, FlashLongPoll.numErrorsInARow);
                    }, 15000);
                } else {
                    gKontikiAgentLogs += "Flash long-poll failed to embed\n";
                    FlashLongPoll.callback({ error: "Long-poll .swf failed to embed" }, FlashLongPoll.numErrorsInARow);
                }
            });
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Event handlers for the object so that the Flash code can correctly tie into it.
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var ioError = function (error) {
        gKontikiAgentLogs += "Flash long-poll I/O error: " + error + "\n";
        // assume this is a timeout, or at least retryable: restart poll, giving the .swf object time to settle
        setTimeout(poll, 250);
    };

    var longpollLoadError = function (error) {
        gKontikiAgentLogs += "Flash long-poll load error: {0}\n".format(error);
    };

    var open = function () {
    };

    var prefetchError = function (error) {
        gKontikiAgentLogs += "Flash prefetch load error: {0}\n".format(error);
    };

    var prefetchOpen = function () {
        gKontikiAgentLogs += "Flash long-poll prefetch URL opened\n";
    };

    var response = function (response) {
        gKontikiAgentLogs += "Flash long-poll message: {0}\n".format(JSON.stringify(response));
        if (response && response.ts) {
            FlashLongPoll.timestamp = response.ts;
        }
        // hand the long-poll message to the callback
        FlashLongPoll.numErrorsInARow = FlashLongPoll.callback(response, FlashLongPoll.numErrorsInARow);

        // restart poll, giving the .swf object time to settle, disabling prefetch (we only do it on first request)
        FlashLongPoll.prefetchUrl = "";
        setTimeout(poll, 250);
    };

    var securityError = function (error) {
        gKontikiAgentLogs += "Flash long-poll security error: " + error + "\n";
        FlashLongPoll.callback({ error: error }, FlashLongPoll.numErrorsInARow);
    };

    var started = function (url) {
        clearTimeout(FlashLongPoll.flashStartTimer);
        gKontikiAgentLogs += "Flash long-poll bridge has started\n";
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // End of event handlers
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Make event handlers and start method public on the object.
    FlashLongPoll.ioError = ioError;
    FlashLongPoll.longpollLoadError = longpollLoadError;
    FlashLongPoll.open = open;
    FlashLongPoll.prefetchError = prefetchError;
    FlashLongPoll.prefetchOpen = prefetchOpen;
    FlashLongPoll.response = response;
    FlashLongPoll.securityError = securityError;
    FlashLongPoll.started = started;
    FlashLongPoll.start = start;

    return FlashLongPoll;
})(Panopto.Viewer.FlashLongPoll || {});

// Add Flash long poll as a Global variable
FlashLongPoll = Panopto.Viewer.FlashLongPoll;
