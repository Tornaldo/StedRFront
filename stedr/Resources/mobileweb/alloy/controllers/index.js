function Controller() {
    function hideKeyboard() {
        "iphone" == Alloy.Globals.OS ? $.mapSearchBar.blur() : Ti.UI.Android.hideSoftKeyboard();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mapWin = Ti.UI.createWindow({
        title: "Map",
        id: "mapWin",
        layout: "vertical"
    });
    $.__views.mapWin && $.addTopLevelView($.__views.mapWin);
    $.__views.mapSearchBar = Ti.UI.createSearchBar({
        backgroundColor: "#40B0D2",
        id: "mapSearchBar",
        showCancel: "true",
        hintText: "Search...",
        height: "10%"
    });
    $.__views.mapWin.add($.__views.mapSearchBar);
    hideKeyboard ? $.__views.mapSearchBar.addEventListener("cancel", hideKeyboard) : __defers["$.__views.mapSearchBar!cancel!hideKeyboard"] = true;
    $.__views.mapViewContainer = Ti.UI.createView({
        id: "mapViewContainer",
        height: "90%"
    });
    $.__views.mapWin.add($.__views.mapViewContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if ("iphone" == Alloy.Globals.OS) {
        Ti.API.info("HI");
        Alloy.Globals.Nav = $.nav;
        $.nav.open();
    } else $.mapWin.open();
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
    $.mapViewContainer.add(mapview);
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
            alert("Something went wrong fetching the walls");
        }
    });
    mapview.addEventListener("click", function(evt) {
        Ti.API.info(evt.type);
        Ti.API.info(evt.clicksource);
        if ("infoWindow" == evt.clicksource || "leftPane" == evt.clicksource || "title" == evt.clicksource || "rightPane" == evt.clicksource || "leftView" == evt.clicksource || "rightView" == evt.clicksource) {
            Ti.API.info("Trying to enter: " + wallCollection.get(evt.annotation.id).get("title"));
            var stedrWallController = Alloy.createController("stedrWall", {
                $model: wallCollection.get(evt.annotation.id)
            });
            var win = stedrWallController.getView();
            "iphone" == Alloy.Globals.OS ? $.nav.openWindow(win) : win.open();
        }
    });
    $.mapSearchBar.addEventListener("cancel", function() {
        $.mapSearchBar.setValue("");
    });
    $.mapSearchBar.addEventListener("return", function() {
        hideKeyboard();
        var searchText = $.mapSearchBar.getValue();
        var geocoder = new google.maps.Geocoder();
        geocoder ? geocoder.geocode({
            address: searchText
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) mapview.setLocation({
                latitude: results[0].geometry.location.lat(),
                longitude: results[0].geometry.location.lng(),
                latitudeDelta: .1,
                longitudeDelta: .1
            }); else {
                Ti.API.error(status);
                Ti.API.info(JSON.stringify(results));
            }
        }) : alert("Google Maps Geocoder not supported");
    });
    $.mapWin.addEventListener("close", function() {
        wallCollection.destroy();
        mapview.close();
        $.destroy();
    });
    __defers["$.__views.mapSearchBar!cancel!hideKeyboard"] && $.__views.mapSearchBar.addEventListener("cancel", hideKeyboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;