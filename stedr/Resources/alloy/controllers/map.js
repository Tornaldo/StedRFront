function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.map = Ti.UI.createWindow({
        title: "Wall",
        id: "map"
    });
    $.__views.map && $.addTopLevelView($.__views.map);
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
    $.__views.map.add($.__views.mapview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;