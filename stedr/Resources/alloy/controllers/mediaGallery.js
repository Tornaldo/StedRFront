function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mediaGallery";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId10 = [];
    $.__views.imageScroller = Ti.UI.createScrollableView({
        views: __alloyId10,
        id: "imageScroller",
        showPagingControl: "true"
    });
    $.__views.imageScroller && $.addTopLevelView($.__views.imageScroller);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var imageUrlList = $model.get("pictures");
    Ti.API.info("Pictures for: " + $model.get("title"));
    for (i = 0; imageUrlList.length > i; i++) {
        var wallImage = Ti.UI.createImageView({
            image: imageUrlList[i].url
        });
        $.imageScroller.addView(wallImage);
    }
    $.imageScroller.addEventListener("close", function() {
        Ti.API.info("Destroying gallery: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;