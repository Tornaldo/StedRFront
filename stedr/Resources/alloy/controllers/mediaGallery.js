function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mediaGallery";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId10 = [];
    $.__views.mediaScroller = Ti.UI.createScrollableView({
        views: __alloyId10,
        id: "mediaScroller",
        showPagingControl: "true"
    });
    $.__views.mediaScroller && $.addTopLevelView($.__views.mediaScroller);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var imageUrlList = $model.get("pictures");
    var videoUrlList = $model.get("videos");
    Ti.API.info("Media for: " + $model.get("title"));
    Ti.API.info(JSON.stringify($model.get("pictures")));
    for (i = 0; imageUrlList.length > i; i++) {
        var wallImage = Ti.UI.createImageView({
            image: imageUrlList[i]
        });
        $.mediaScroller.addView(wallImage);
    }
    for (i = 0; videoUrlList.length > i; i++) {
        var wallImage = Titanium.Media.createVideoPlayer({
            url: videoUrlList[i],
            backgroundColor: "blue",
            movieControlMode: Titanium.Media.VIDEO_CONTROL_DEFAULT,
            autoplay: false
        });
        $.mediaScroller.addView(wallImage);
    }
    $.mediaScroller.addEventListener("close", function() {
        Ti.API.info("Destroying gallery: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;