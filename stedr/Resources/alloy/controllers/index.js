function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.mapWin = Ti.UI.createWindow({
        title: "Wall",
        id: "mapWin",
        layout: "vertical"
    });
    $.__views.mapWin && $.addTopLevelView($.__views.mapWin);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "10%",
        layout: "horizontal",
        id: "__alloyId0"
    });
    $.__views.mapWin.add($.__views.__alloyId0);
    $.__views.searchField = Ti.UI.createTextField({
        id: "searchField",
        width: "80%",
        hintText: "Search location"
    });
    $.__views.__alloyId0.add($.__views.searchField);
    $.__views.mapSearchButton = Ti.UI.createButton({
        id: "mapSearchButton",
        title: "Search"
    });
    $.__views.__alloyId0.add($.__views.mapSearchButton);
    $.__views.mapView = Ti.UI.createView({
        id: "mapView",
        height: "90%"
    });
    $.__views.mapWin.add($.__views.mapView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.mapWin.open();
    var mapview;
    mapview = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        animate: true,
        regionFit: true,
        userLocation: true,
        region: {
            latitude: 63.427255,
            longitude: 10.396545,
            latitudeDelta: .01,
            longitudeDelta: .01
        }
    });
    $.mapView.add(mapview);
    mapview.addEventListener("click", function(evt) {
        Ti.API.info(evt.type);
        Ti.API.info(evt.clicksource);
        if ("infoWindow" == evt.clicksource || "leftPane" == evt.clicksource || "title" == evt.clicksource || "rightPane" == evt.clicksource) {
            Ti.API.info("Trying to enter: " + wallCollection.get(evt.annotation.id).get("title"));
            var stedrWallController = Alloy.createController("stedrWall", {
                $model: wallCollection.get(evt.annotation.id)
            });
            stedrWallController.getView().open();
        }
    });
    $.mapSearchButton.addEventListener("click", function() {
        var searchText = $.searchField.getValue();
        Ti.API.info("WEB");
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
    var wallCollection = Alloy.Collections.wall;
    wallCollection.fetch({
        success: function() {
            _.each(wallCollection.models, function(element) {
                Ti.API.info("Making annotation for " + element.get("title"));
                var mapAnnotation;
                var mapAnnotation = Titanium.Map.createAnnotation({
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