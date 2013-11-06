function Controller() {
    function changeView(evt) {
        Ti.API.info("Change view");
        if (1 == evt) {
            $.storyTab.setBackgroundColor("#40B0D2");
            storyGalleryController.getView().show();
            instagramController.getView().hide();
            $.pictureTab.setBackgroundColor("#8D8D8D");
        } else if (2 == evt) {
            $.pictureTab.setBackgroundColor("#40B0D2");
            instagramController.getView().show();
            storyGalleryController.getView().hide();
            $.storyTab.setBackgroundColor("#8D8D8D");
        }
    }
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
    $.__views.wallPictureView = Ti.UI.createView({
        id: "wallPictureView",
        height: "50%",
        layout: "vertical"
    });
    $.__views.stedrWall.add($.__views.wallPictureView);
    var __alloyId3 = [];
    $.__views.mediaScrollerMainImage = Ti.UI.createScrollableView({
        views: __alloyId3,
        id: "mediaScrollerMainImage",
        showPagingControl: "true",
        height: "95%"
    });
    $.__views.wallPictureView.add($.__views.mediaScrollerMainImage);
    $.__views.creditLabel = Ti.UI.createLabel({
        color: "black",
        font: {
            fontFamily: "Helvetica",
            fontSize: "10sp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "creditLabel",
        height: "5%"
    });
    $.__views.wallPictureView.add($.__views.creditLabel);
    $.__views.storyAndPictureView = Ti.UI.createView({
        id: "storyAndPictureView",
        layout: "vertical",
        height: "50%"
    });
    $.__views.stedrWall.add($.__views.storyAndPictureView);
    $.__views.tabView = Ti.UI.createView({
        id: "tabView",
        layout: "horizontal",
        height: "20%"
    });
    $.__views.storyAndPictureView.add($.__views.tabView);
    $.__views.storyTab = Ti.UI.createButton({
        backgroundColor: "#40B0D2",
        borderColor: "#8D8D8D",
        borderRadius: 4,
        color: "white",
        font: {
            color: "white",
            fontFamily: "Helvetica",
            fontSize: "25sp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        id: "storyTab",
        title: "Stories",
        height: "80%",
        width: "30%"
    });
    $.__views.tabView.add($.__views.storyTab);
    $.__views.pictureTab = Ti.UI.createButton({
        backgroundColor: "#8D8D8D",
        borderColor: "#8D8D8D",
        borderRadius: 4,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        font: {
            fontFamily: "Helvetica",
            fontSize: "25sp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        id: "pictureTab",
        title: "Pictures",
        height: "80%",
        width: "30%"
    });
    $.__views.tabView.add($.__views.pictureTab);
    $.__views.storyOrPictureView = Ti.UI.createView({
        id: "storyOrPictureView",
        height: "80%"
    });
    $.__views.storyAndPictureView.add($.__views.storyOrPictureView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.mediaScrollerMainImage.addView(Ti.UI.createImageView({
        image: $model.get("pictureUrl")
    }));
    $.creditLabel.setText("FOTO: " + $model.get("ownerName"));
    Ti.API.info("Starting storygallery: " + $model.get("title"));
    var storyGalleryController = Alloy.createController("story", {
        $model: $model
    });
    Ti.API.info("Starting instagramgallery: " + $model.get("title"));
    var instagramController = Alloy.createController("instagram", {
        $model: $model
    });
    $.storyOrPictureView.add(instagramController.getView());
    $.storyOrPictureView.add(storyGalleryController.getView());
    $.storyTab.addEventListener("click", function() {
        changeView(1);
    });
    $.pictureTab.addEventListener("click", function() {
        changeView(2);
    });
    $.stedrWall.addEventListener("close", function() {
        Ti.API.info("Destroying: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;