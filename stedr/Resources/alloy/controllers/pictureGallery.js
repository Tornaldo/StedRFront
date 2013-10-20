function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pictureGallery";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId13 = [];
    $.__views.imageScroller = Ti.UI.createScrollableView({
        views: __alloyId13,
        id: "imageScroller",
        showPagingControl: "true"
    });
    $.__views.imageScroller && $.addTopLevelView($.__views.imageScroller);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("This is the gallery to " + $.wallModel.get("title"));
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;