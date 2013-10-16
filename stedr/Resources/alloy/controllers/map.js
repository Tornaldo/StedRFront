function Controller() {
    function createAnnotations() {
        var wallList = new Array();
        wallCollection.fetch({
            success: function() {
                _.each(wallCollection.models, function(element, index) {
                    var mapAnnotation = Titanium.Map.createAnnotation({
                        title: element.get("name"),
                        latitude: element.get("latitude"),
                        longitude: element.get("longitude"),
                        pincolor: Titanium.Map.ANNOTATION_GREEN,
                        leftButton: "/images/buttonimage.jpg",
                        id: index
                    });
                    wallList.push(mapAnnotation);
                });
                mapview.annotations = wallList;
            },
            error: function() {
                Ti.API.error("hmm - this is not good!");
            }
        });
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
        regionFit: true,
        userLocation: false
    });
    $.mapWin.add(mapview);
    mapview.addEventListener("click", function(evt) {
        if ("leftButton" == evt.clicksource) {
            Alloy.createController("stedrWall", {
                data: wallCollection.get(evt.annotation.id)
            });
            var wall = Alloy.createController("stedrWall").getView();
            wall.open();
        }
    });
    var wallCollection = Alloy.Collections.wall;
    __defers["$.__views.mapWin!open!createAnnotations"] && $.__views.mapWin.addEventListener("open", createAnnotations);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;