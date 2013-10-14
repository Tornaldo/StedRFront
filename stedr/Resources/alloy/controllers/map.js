function Controller() {
    function createAnnotations() {
        var wallList = new Array();
        var x = Titanium.Map.createAnnotation({
            latitude: 52.702187,
            longitude: 10.228271,
            title: "Somewhere in Deutschland",
            pincolor: Titanium.Map.ANNOTATION_RED,
            leftButton: "/images/buttonimage.jpg"
        });
        var y = Titanium.Map.createAnnotation({
            latitude: 63.428283,
            longitude: 10.395041,
            title: "Trondheim",
            pincolor: Titanium.Map.ANNOTATION_RED,
            leftButton: "/images/buttonimage.jpg"
        });
        wallList.push(x);
        wallList.push(y);
        Ti.API.info(wallList.length);
        for (var i in wallList) Ti.API.info(i.title);
        mapview.annotations = wallList;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mapWin = Ti.UI.createWindow({
        title: "Wall",
        id: "mapWin"
    });
    $.__views.mapWin && $.addTopLevelView($.__views.mapWin);
    createAnnotations ? $.__views.mapWin.addEventListener("open", createAnnotations) : __defers["$.__views.mapWin!open!createAnnotations"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mapview = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        animate: true,
        userLocation: false
    });
    $.mapWin.add(mapview);
    mapview.addEventListener("click", function(evt) {
        Ti.API.info("Annotation " + evt.title);
        "leftPane" == evt.clicksource && $stedrWall.open();
    });
    __defers["$.__views.mapWin!open!createAnnotations"] && $.__views.mapWin.addEventListener("open", createAnnotations);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;