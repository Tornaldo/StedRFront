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
    $.__views.__alloyId3 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#40B0D2",
        id: "__alloyId3"
    });
    $.__views.storyView.add($.__views.__alloyId3);
    $.__views.storyTitle = Ti.UI.createLabel({
        color: "white",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "storyTitle"
    });
    $.__views.__alloyId3.add($.__views.storyTitle);
    $.__views.subTitle = Ti.UI.createLabel({
        color: "white",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "subTitle"
    });
    $.__views.__alloyId3.add($.__views.subTitle);
    $.__views.storyText = Ti.UI.createLabel({
        color: "white",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "storyText"
    });
    $.__views.__alloyId3.add($.__views.storyText);
    $.__views.storyAuthor = Ti.UI.createLabel({
        color: "white",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "storyAuthor"
    });
    $.__views.__alloyId3.add($.__views.storyAuthor);
    $.__views.tagView = Ti.UI.createView({
        id: "tagView",
        layout: "horizontal"
    });
    $.__views.__alloyId3.add($.__views.tagView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Hello");
    Ti.API.info("Entering: " + $model.get("title"));
    var mediaGalleryController = Alloy.createController("mediaGallery", {
        $model: $model
    });
    $.mediaGalleryStory.add(mediaGalleryController.getView());
    $.storyTitle.setText($model.get("title"));
    $.subTitle.setText($model.get("ingress"));
    $.storyText.setText($model.get("fortelling"));
    $.storyAuthor.setText($model.get("author"));
    var tags = $model.get("tags");
    for (i = 0; tags.length > i; i++) {
        var tag = Ti.UI.createLabel({
            text: tags[i]
        });
        $.tagView.add(tag);
    }
    $.storyView.addEventListener("close", function() {
        Ti.API.info("Destroying: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;