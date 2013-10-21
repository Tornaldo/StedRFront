function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "stedrWall";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.stedrWall = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        exitOnClose: "false",
        navBarHidden: "false",
        id: "stedrWall"
    });
    $.__views.stedrWall && $.addTopLevelView($.__views.stedrWall);
    $.__views.pictureGallery = Ti.UI.createView({
        borderColor: "green",
        borderWidth: 3,
        id: "pictureGallery",
        height: "50%"
    });
    $.__views.stedrWall.add($.__views.pictureGallery);
    $.__views.storyAndPictureView = Ti.UI.createView({
        borderColor: "blue",
        borderWidth: 3,
        id: "storyAndPictureView",
        layout: "vertical",
        height: "50%"
    });
    $.__views.stedrWall.add($.__views.storyAndPictureView);
    $.__views.labelView = Ti.UI.createView({
        borderColor: "yellow",
        borderWidth: 3,
        id: "labelView",
        layout: "horizontal",
        height: "10%"
    });
    $.__views.storyAndPictureView.add($.__views.labelView);
    $.__views.pictureTab = Ti.UI.createLabel({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        right: 10,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        borderColor: "gray",
        borderWidth: 3,
        id: "pictureTab",
        text: "Bilder",
        touchEnabled: "true"
    });
    $.__views.labelView.add($.__views.pictureTab);
    $.__views.storyTab = Ti.UI.createLabel({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        right: 10,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        borderColor: "pink",
        borderWidth: 3,
        id: "storyTab",
        text: "Historier",
        touchEnabled: "true"
    });
    $.__views.labelView.add($.__views.storyTab);
    $.__views.storyOrPictureView = Ti.UI.createView({
        id: "storyOrPictureView",
        height: "90%"
    });
    $.__views.storyAndPictureView.add($.__views.storyOrPictureView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Hello");
    Ti.API.info("Entering: " + $model.get("title"));
    Ti.API.info("Starting picturegallery: " + $model.get("title"));
    var pictureGalleryController = Alloy.createController("pictureGallery", {
        $model: $model
    });
    $.pictureGallery.add(pictureGalleryController.getView());
    Ti.API.info("Starting storygallery: " + $model.get("title"));
    var storyGalleryController = Alloy.createController("story", {
        $model: $model
    });
    $.storyOrPictureView.add(storyGalleryController.getView());
    Ti.API.info("Starting instagramgallery: " + $model.get("title"));
    Alloy.createController("instagramController", {
        $model: $model
    });
    $.stedrWall.addEventListener("close", function() {
        Ti.API.info("Destroying: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;