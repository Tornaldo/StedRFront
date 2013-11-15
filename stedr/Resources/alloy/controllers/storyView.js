function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.hei = Ti.UI.createTabGroup({
        id: "hei"
    });
    $.__views.__alloyId3 = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        exitOnClose: "true",
        navBarHidden: "true",
        id: "__alloyId3"
    });
    $.__views.mediaGalleryView = Ti.UI.createView({
        id: "mediaGalleryView",
        height: "50%"
    });
    $.__views.__alloyId3.add($.__views.mediaGalleryView);
    $.__views.__alloyId4 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#40B0D2",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.storyTitle = Ti.UI.createLabel({
        color: "white",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        id: "storyTitle"
    });
    $.__views.__alloyId4.add($.__views.storyTitle);
    $.__views.subTitle = Ti.UI.createLabel({
        top: "10dp",
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
    $.__views.__alloyId4.add($.__views.subTitle);
    $.__views.storyText = Ti.UI.createLabel({
        top: "10dp",
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
    $.__views.__alloyId4.add($.__views.storyText);
    $.__views.storyAuthor = Ti.UI.createLabel({
        top: "10dp",
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
    $.__views.__alloyId4.add($.__views.storyAuthor);
    $.__views.tagView = Ti.UI.createView({
        id: "tagView",
        layout: "vertical"
    });
    $.__views.__alloyId4.add($.__views.tagView);
    $.__views.storyTab = Ti.UI.createTab({
        activeIcon: "twitterlogowhite.png",
        icon: "images/digitaltfortaltlogo.png",
        backgroundColor: "#8D8D8D",
        backgroundSelectedColor: "#40B0D2",
        window: $.__views.__alloyId3,
        id: "storyTab"
    });
    $.__views.hei.addTab($.__views.storyTab);
    $.__views.twitterWin = Ti.UI.createWindow({
        id: "twitterWin",
        navBarHidden: "true",
        exitOnClose: "true"
    });
    $.__views.twitterView = Ti.UI.createView({
        id: "twitterView"
    });
    $.__views.twitterWin.add($.__views.twitterView);
    $.__views.commentTab = Ti.UI.createTab({
        activeIcon: "digitaltfortaltlogowhite.png",
        icon: "images/twitterlogo.png",
        backgroundColor: "#8D8D8D",
        backgroundSelectedColor: "#40B0D2",
        window: $.__views.twitterWin,
        id: "commentTab"
    });
    $.__views.hei.addTab($.__views.commentTab);
    $.__views.hei && $.addTopLevelView($.__views.hei);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mediaGalleryController = Alloy.createController("mediaGallery", {
        $model: $model
    });
    $.mediaGalleryView.add(mediaGalleryController.getView());
    var twitterController = Alloy.createController("twitter", {
        $model: $model
    });
    $.twitterView.add(twitterController.getView());
    $.storyTitle.setText($model.get("title"));
    $.subTitle.setText($model.get("ingress"));
    $.storyText.setText($model.get("fortelling"));
    $.storyAuthor.setText("Author: " + $model.get("author"));
    var tags = $model.get("tags");
    var tagStart = Ti.UI.createLabel({
        text: "Tags: ",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 5,
        color: "white",
        font: {
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        }
    });
    $.tagView.add(tagStart);
    for (i = 0; tags.length > i; i++) {
        var tag = Ti.UI.createLabel({
            text: "- " + tags[i],
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            left: 10,
            color: "white",
            font: {
                fontFamily: "Helvetica",
                fontSize: "15dp",
                fontStyle: "normal",
                fontWeight: "normal"
            }
        });
        $.tagView.add(tag);
    }
    $.hei.addEventListener("close", function() {
        Ti.API.info("Destroying storyview");
        mediaGalleryController = null;
        twitterController = null;
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;