function Controller() {
    function createAnnotations() {
        Ti.API.info("START CREATING PINS");
        var wallList = new Array();
        var walls = Alloy.Collections.wall;
        walls.fetch({
            success: function() {
                _.each(walls.models, function(element) {
                    Ti.API.info(element.get("latitude"));
                    var mapAnnotation = Titanium.Map.createAnnotation({
                        title: element.get("name"),
                        latitude: element.get("latitude"),
                        longitude: element.get("longitude"),
                        pincolor: Titanium.Map.ANNOTATION_GREEN,
                        leftButton: "/images/buttonimage.jpg"
                    });
                    Ti.API.info(mapAnnotation);
                    wallList.push(mapAnnotation);
                });
                mapview.annotations = wallList;
            },
            error: function() {
                Ti.API.error("hmm - this is not good!");
            }
        });
        Ti.API.info("STOP CREATING PINS");
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
        if ("leftButton" == evt.clicksource) {
            var wall = Alloy.createController("stedrWall").getView();
            wall.open();
        }
    });
    __defers["$.__views.mapWin!open!createAnnotations"] && $.__views.mapWin.addEventListener("open", createAnnotations);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;