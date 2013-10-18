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
    var MapModule;
    var mapview;
    MapModule = require("ti.map");
    mapview = MapModule.createView({
        userLocation: true,
        mapType: MapModule.NORMAL_TYPE,
        animate: true,
        region: {
            latitude: -33.87365,
            longitude: 151.20689,
            latitudeDelta: .1,
            longitudeDelta: .1
        }
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
                Ti.API.info(element.get("name"));
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;