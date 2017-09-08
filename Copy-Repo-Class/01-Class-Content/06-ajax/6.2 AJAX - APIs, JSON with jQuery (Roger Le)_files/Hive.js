// These are background facts on how Hive works in terms of our viewer. We register the videos with the Hive endpoint
// at stream creation time and we get back an url that let's us get back the m3u8. Hive has a plugin that does all the
// resolving internally so this just creates the necessary objects to enable the plugin.

var Panopto = Panopto || {};
Panopto.Viewer = Panopto.Viewer || {};
Panopto.Viewer.Constants = Panopto.Viewer.Constants || {};

Panopto.Viewer.Hive = (function (Hive) {

    // Detect if the user has the special query string to turn off broadcast optimization
    var query = Panopto.Core.StringHelpers.parseQueryString(window.location.search.slice(1));
    var optimizationEnabled = query.P2POptimization !== 'disabled';

    // Returns true if Hive is enabled for this source, checks if optimization is enabled, if FlowPlayer Hive is
    // enabled, if Hive is enabled, if Kollective is disabled as it takes precedence, and if the optimizationToken
    // is not null.
    var isHiveOptimized = function (optimizationToken) {
        return optimizationEnabled
            && Panopto.viewer.isDebugModeForFlowplayerHiveEnabled
            && Panopto.viewer.isHiveEnabled
            && !Panopto.viewer.isKollectiveEnabled
            && optimizationToken
    };

    // Create the Hive plugin object for the flowplayer instantiation. If Hive is enabled for this and Kollective is
    // not we will create the plugin object and pass the ticket as the source.
    var createFlowplayerPlugin = function (content) {
        var hivePlugin = {};
        if (isHiveOptimized(content.optimizationToken)) {

            // Set this to use the HiveJava and then fallback to HiveStats.
            hivePlugin = {
                sources: [
                    {
                        type: "application/x-mpegurl",
                        ticket: content.optimizationToken
                    }
                ],
                options: {
                    debugLevel: 'debug',
                    hiveTechOrder: ["HiveJava", "StatsJS"]
                }
            };
        }

        return hivePlugin;
    };

    // Expose the public methods
    Hive.isHiveOptimized = isHiveOptimized;
    Hive.createFlowplayerPlugin = createFlowplayerPlugin;

    return Hive;
})(Panopto.Viewer.Hive || {});