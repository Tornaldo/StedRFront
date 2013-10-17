function Controller() {
    function __alloyId11() {
        __alloyId11.opts || {};
        var models = __alloyId10.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId8 = models[i];
            __alloyId8.__transform = {};
            var __alloyId9 = Ti.UI.createTableViewRow({
                title: "undefined" != typeof __alloyId8.__transform["name"] ? __alloyId8.__transform["name"] : __alloyId8.get("name")
            });
            rows.push(__alloyId9);
        }
        $.__views.__alloyId6.setData(rows);
    }
    function checkGooglePlayService() {
        var MapModule = require("ti.map");
        var rc = MapModule.isGooglePlayServicesAvailable();
        switch (rc) {
          case MapModule.SUCCESS:
            Ti.API.info("Google Play services is installed.");
            break;

          case MapModule.SERVICE_MISSING:
            Ti.API.info("Google Play services is missing. Please install Google Play services from the Google Play store.");
            break;

          case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
            Ti.API.info("Google Play services is out of date. Please update Google Play services.");
            break;

          case MapModule.SERVICE_DISABLED:
            Ti.API.info("Google Play services is disabled. Please enable Google Play services.");
            break;

          case MapModule.SERVICE_INVALID:
            Ti.API.info("Google Play services cannot be authenticated. Reinstall Google Play services.");
            break;

          default:
            Ti.API.info("Unknown error.");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("wall");
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId5 = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Walls",
        id: "__alloyId5"
    });
    $.__views.__alloyId6 = Ti.UI.createTableView({
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    var __alloyId10 = Alloy.Collections["wall"] || wall;
    __alloyId10.on("fetch destroy change add remove reset", __alloyId11);
    $.__views.__alloyId4 = Ti.UI.createTab({
        window: $.__views.__alloyId5,
        title: "List",
        id: "__alloyId4"
    });
    $.__views.index.addTab($.__views.__alloyId4);
    $.__views.mapWin = Ti.UI.createWindow({
        title: "Wall",
        id: "mapWin"
    });
    checkGooglePlayService ? $.__views.mapWin.addEventListener("open", checkGooglePlayService) : __defers["$.__views.mapWin!open!checkGooglePlayService"] = true;
    $.__views.__alloyId12 = Ti.UI.createTab({
        window: $.__views.mapWin,
        title: "Map",
        id: "__alloyId12"
    });
    $.__views.index.addTab($.__views.__alloyId12);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {
        __alloyId10.off("fetch destroy change add remove reset", __alloyId11);
    };
    _.extend($, $.__views);
    $.index.open();
    var wallList = new Array();
    var MapModule = require("ti.map");
    var mapview = MapModule.createView({
        mapType: MapModule.TERRAIN_TYPE,
        region: {
            latitude: -33.87365,
            longitude: 151.20689,
            latitudeDelta: .1,
            longitudeDelta: .1
        },
        animate: true
    });
    $.mapWin.add(mapview);
    mapview.addEventListener("click", function(evt) {
        if ("leftButton" == evt.clicksource) {
            var stedrWallController = Alloy.createController("stedrWall", {
                data: wallCollection.get(evt.annotation.id),
                $model: wallCollection.get(evt.annotation.id)
            });
            stedrWallController.getView().open();
        }
    });
    Titanium.UI.createView({
        borderRadius: 5,
        backgroundColor: "red",
        width: 500,
        height: 500
    });
    var wallCollection = Alloy.Collections.wall;
    wallCollection.fetch({
        success: function() {
            _.each(wallCollection.models, function(element, index) {
                var mapAnnotation = Titanium.Map.createAnnotation({
                    title: element.get("name"),
                    latitude: element.get("latitude"),
                    longitude: element.get("longitude"),
                    pincolor: Titanium.Map.ANNOTATION_GREEN,
                    id: index
                });
                wallList.push(mapAnnotation);
            });
            mapview.annotations = wallList;
            Ti.API.info(wallCollection);
        },
        error: function() {
            Ti.API.error("hmm - this is not good!");
        }
    });
    $.index.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.mapWin!open!checkGooglePlayService"] && $.__views.mapWin.addEventListener("open", checkGooglePlayService);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;