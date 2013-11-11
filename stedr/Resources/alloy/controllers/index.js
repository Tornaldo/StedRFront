function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.mapWin = Ti.UI.createWindow({
        title: "Map",
        id: "mapWin",
        layout: "vertical"
    });
    $.__views.mapWin && $.addTopLevelView($.__views.mapWin);
    $.__views.mapView = Ti.UI.createView({
        id: "mapView",
        height: "90%"
    });
    $.__views.mapWin.add($.__views.mapView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if ("iphone" == Alloy.Globals.OS) {
        Alloy.Globals.Nav = $.nav;
        $.nav.open();
    } else {
        Ti.API.info("starter ikke iphone");
        $.mapWin.open();
    }
    var MapModule;
    var mapview;
    if ("android" == Alloy.Globals.OS) {
        MapModule = require("ti.map");
        mapview = MapModule.createView({
            userLocation: true,
            animate: true,
            mapType: MapModule.NORMAL_TYPE
        });
    } else mapview = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        animate: true,
        userLocation: true,
        region: {
            latitude: 63.427255,
            longitude: 10.396545,
            latitudeDelta: .01,
            longitudeDelta: .01
        }
    });
    Ti.API.info("START MAP");
    $.mapView.add(mapview);
    Ti.API.info("Add eventlisteners");
    mapview.addEventListener("click", function(evt) {
        Ti.API.info(evt.type);
        Ti.API.info(evt.clicksource);
        if ("infoWindow" == evt.clicksource || "leftPane" == evt.clicksource || "title" == evt.clicksource || "rightPane" == evt.clicksource) {
            Ti.API.info("Trying to enter: " + wallCollection.get(evt.annotation.id).get("title"));
            var stedrWallController = Alloy.createController("stedrWall", {
                $model: wallCollection.get(evt.annotation.id)
            });
            var win = stedrWallController.getView();
            "iphone" == Alloy.Globals.OS ? $.nav.openWindow(win) : win.open();
        }
    });
    var wallCollection = Alloy.Collections.wall;
    wallCollection.fetch({
        success: function() {
            _.each(wallCollection.models, function(element) {
                Ti.API.info("Making annotation for " + element.get("title"));
                if ("android" == Alloy.Globals.OS) var mapAnnotation = MapModule.createAnnotation({
                    title: element.get("title"),
                    latitude: element.get("latitude"),
                    longitude: element.get("longitude"),
                    rightView: Ti.UI.createImageView({
                        image: element.get("thumbnailUrl")
                    }),
                    pincolor: MapModule.ANNOTATION_AZURE,
                    id: element.get("id")
                }); else var mapAnnotation = Titanium.Map.createAnnotation({
                    title: element.get("title"),
                    latitude: element.get("latitude"),
                    longitude: element.get("longitude"),
                    rightView: Ti.UI.createImageView({
                        image: element.get("thumbnailUrl")
                    }),
                    id: element.get("id")
                });
                mapview.addAnnotation(mapAnnotation);
            });
        },
        error: function() {
            Ti.API.error("woops");
        }
    });
    $.mapWin.addEventListener("close", function() {
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;