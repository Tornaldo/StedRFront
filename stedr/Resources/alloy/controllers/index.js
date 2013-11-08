function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    (Alloy.Globals.OS = "iphone") ? $.nav.open() : $.mapWin.open();
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
    $.mapView.add(mapview);
    mapview.addEventListener("click", function(evt) {
        Ti.API.info(evt.type);
        Ti.API.info(evt.clicksource);
        if ("infoWindow" == evt.clicksource || "leftPane" == evt.clicksource || "title" == evt.clicksource || "rightPane" == evt.clicksource) {
            Ti.API.info("Trying to enter: " + wallCollection.get(evt.annotation.id).get("title"));
            var stedrWallController = Alloy.createController("stedrWall", {
                $model: wallCollection.get(evt.annotation.id)
            });
            var win = stedrWallController.getView();
            (Alloy.Globals.OS = "iphone") ? $.nav.openWindow(win) : win.open();
        }
    });
    $.mapSearchButton.addEventListener("click", function() {
        var searchText = $.searchField.getValue();
        Ti.API.info("PHONE");
        var xhr = Titanium.Network.createHTTPClient();
        var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + searchText + "&sensor=true&key=AIzaSyD7QIWz-xIs3WTWYR_0eaH_whi56NNE1sE";
        xhr.open("GET", url);
        xhr.onload = function() {
            var json = JSON.parse(this.responseText);
            switch (json.status) {
              case "OK":
                Ti.API.info(JSON.stringify(json));
                mapview.setLocation({
                    latitude: json.results[0].geometry.location.lat,
                    longitude: json.results[0].geometry.location.lng,
                    latitudeDelta: .1,
                    longitudeDelta: .1
                });
                break;

              case "ZERO_RESULTS":
                alert("No result for your search");
                break;

              case "OVER_QUERY_LIMIT":
                alert("Sorry, the query limit is exceeded");
                break;

              case "REQUEST_DENIED":
                alert("Sorry, your request was denied");
                break;

              case "INVALID_REQUEST":
                alert("Sorry, your request is invalid");
                break;

              default:
                alert("This is very strange! Do you have internet connection?");
            }
        };
        xhr.onerror = function(e) {
            alert("This is very strange! Do you have internet connection?");
            Ti.API.error(e.error);
        };
        xhr.send();
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