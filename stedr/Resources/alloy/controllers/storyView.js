function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.storyView = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        exitOnClose: "false",
        navBarHidden: "false",
        id: "storyView"
    });
    $.__views.storyView && $.addTopLevelView($.__views.storyView);
    $.__views.mediaGalleryStory = Ti.UI.createView({
        id: "mediaGalleryStory",
        height: "50%"
    });
    $.__views.storyView.add($.__views.mediaGalleryStory);
    $.__views.storyTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "storyTitle"
    });
    $.__views.storyView.add($.__views.storyTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Hello");
    Ti.API.info("Entering: " + $model.get("title"));
    $.storyTitle.setText($model.get("title"));
    var mediaGalleryController = Alloy.createController("mediaGallery", {
        $model: $model
    });
    $.mediaGalleryStory.add(mediaGalleryController.getView());
    $.storyView.addEventListener("close", function() {
        Ti.API.info("Destroying: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;