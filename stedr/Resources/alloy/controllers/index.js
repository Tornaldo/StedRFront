function Controller() {
    function __alloyId7() {
        __alloyId7.opts || {};
        var models = __alloyId6.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId4 = models[i];
            __alloyId4.__transform = {};
            var __alloyId5 = Ti.UI.createTableViewRow({
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "20dp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                title: "undefined" != typeof __alloyId4.__transform["title"] ? __alloyId4.__transform["title"] : __alloyId4.get("title")
            });
            rows.push(__alloyId5);
        }
        $.__views.__alloyId2.setData(rows);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("wall");
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId1 = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Walls",
        id: "__alloyId1"
    });
    $.__views.__alloyId2 = Ti.UI.createTableView({
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    var __alloyId6 = Alloy.Collections["wall"] || wall;
    __alloyId6.on("fetch destroy change add remove reset", __alloyId7);
    $.__views.debugList = Ti.UI.createTab({
        window: $.__views.__alloyId1,
        id: "debugList",
        title: "Liste (Debug)"
    });
    $.__views.index.addTab($.__views.debugList);
    $.__views.mapWin = Ti.UI.createWindow({
        title: "Wall",
        id: "mapWin"
    });
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.mapWin,
        title: "Kart",
        id: "__alloyId8"
    });
    $.__views.index.addTab($.__views.__alloyId8);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {
        __alloyId6.off("fetch destroy change add remove reset", __alloyId7);
    };
    _.extend($, $.__views);
    $.index.open();
    var MapModule;
    var mapview;
    mapview = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        animate: true,
        regionFit: true,
        userLocation: true
    });
    $.mapWin.add(mapview);
    mapview.addEventListener("click", function(evt) {
        Ti.API.info(evt.type);
        Ti.API.info(evt.clicksource);
        if ("infoWindow" == evt.clicksource || "leftPane" == evt.clicksource || "title" == evt.clicksource) {
            Ti.API.info("Trying to enter: " + wallCollection.get(evt.annotation.id).get("title"));
            var stedrWallController = Alloy.createController("stedrWall", {
                $model: wallCollection.get(evt.annotation.id)
            });
            stedrWallController.getView().open();
        }
    });
    var wallCollection = Alloy.Collections.wall;
    wallCollection.fetch({
        success: function() {
            _.each(wallCollection.models, function(element) {
                Ti.API.info("Making annotation for " + element.get("title"));
                var mapAnnotation;
                var mapAnnotation = MapModule.createAnnotation({
                    title: element.get("title"),
                    latitude: element.get("latitude"),
                    longitude: element.get("longitude"),
                    rightView: Ti.UI.createImageView({
                        image: element.get("thumbnailUrl")
                    }),
                    pincolor: MapModule.ANNOTATION_AZURE,
                    leftView: Ti.UI.createButton({
                        title: "Besøk"
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
    $.index.addEventListener("close", function() {
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;