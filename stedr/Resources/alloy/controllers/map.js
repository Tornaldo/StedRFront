function Controller() {
    function createAnnotations() {
        var home = Titanium.Map.createAnnotation({
            latitude: 63.432758,
            longitude: 10.352254,
            title: "Odds home",
            subtitle: "Ingrids home too",
            pincolor: Titanium.Map.ANNOTATION_GREEN
        });
        mapview.annotations = [ home ];
        Ti.API.error("OK");
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
    createAnnotations ? $.__views.mapWin.addEventListener("click", createAnnotations) : __defers["$.__views.mapWin!click!createAnnotations"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mapview = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        animate: true,
        userLocation: true
    });
    $.mapWin.add(mapview);
    __defers["$.__views.mapWin!click!createAnnotations"] && $.__views.mapWin.addEventListener("click", createAnnotations);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;