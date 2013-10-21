function Controller() {
    function changeView(evt) {
        Ti.API.info(evt);
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
    $.__views.pictureGallery = Ti.UI.createView({
        id: "pictureGallery",
        height: "50%"
    });
    $.__views.stedrWall.add($.__views.pictureGallery);
    $.__views.storyAndPictureView = Ti.UI.createView({
        id: "storyAndPictureView",
        layout: "vertical",
        height: "50%",
        width: Ti.UI.Fill
    });
    $.__views.stedrWall.add($.__views.storyAndPictureView);
    $.__views.tabView = Ti.UI.createView({
        id: "tabView",
        layout: "horizontal",
        height: "10%"
    });
    $.__views.storyAndPictureView.add($.__views.tabView);
    $.__views.pictureTab = Ti.UI.createButton({
        backgroundColor: "#8D8D8D",
        color: "white",
        font: {
            fontFamily: "Helvetica",
            fontSize: "20sp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        textAlign: "TEXT_ALIGNEMENT_CENTER",
        id: "pictureTab",
        title: "Bilder"
    });
    $.__views.tabView.add($.__views.pictureTab);
    $.__views.storyTab = Ti.UI.createButton({
        backgroundColor: "#40B0D2",
        color: "white",
        font: {
            color: "white",
            fontFamily: "Helvetica",
            fontSize: "20sp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        textAlign: "TEXT_ALIGNEMENT_CENTER",
        id: "storyTab",
        title: "Historier"
    });
    $.__views.tabView.add($.__views.storyTab);
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