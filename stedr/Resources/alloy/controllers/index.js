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
    $.__views.__alloyId13 = Ti.UI.createWindow({
        title: "Wall",
        id: "__alloyId13"
    });
    var __alloyId14 = [];
    $.__views.mountainView = Ti.Map.createAnnotation({
        latitude: 37.390749,
        longitude: -122.081651,
        id: "mountainView",
        title: "Appcelerator Headquarters",
        subtitle: "Mountain View, CA",
        pincolor: Titanium.Map.ANNOTATION_RED,
        myid: "1"
    });
    __alloyId14.push($.__views.mountainView);
    $.__views.mapview = Ti.Map.createView({
        annotations: __alloyId14,
        id: "mapview",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.__alloyId13.add($.__views.mapview);
    $.__views.__alloyId12 = Ti.UI.createTab({
        window: $.__views.__alloyId13,
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
    var wall = Alloy.Collections.wall;
    wall.fetch({
        success: function() {
            _.each(wall.models, function() {});
            Ti.API.log(wall);
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