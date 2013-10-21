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
        navBarHidden: "true",
        id: "stedrWall"
    });
    $.__views.stedrWall && $.addTopLevelView($.__views.stedrWall);
    $.__views.test1View = Ti.UI.createView({
        borderColor: "green",
        borderWidth: 3,
        id: "test1View"
    });
    $.__views.stedrWall.add($.__views.test1View);
    $.__views.test2View = Ti.UI.createView({
        borderColor: "green",
        borderWidth: 3,
        top: 300,
        id: "test2View",
        layout: "vertical"
    });
    $.__views.stedrWall.add($.__views.test2View);
    $.__views.labelView = Ti.UI.createView({
        id: "labelView",
        layout: "horizontal"
    });
    $.__views.test2View.add($.__views.labelView);
    $.__views.testLabel2 = Ti.UI.createLabel({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        left: 10,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        borderColor: "green",
        borderWidth: 3,
        id: "testLabel2",
        text: "Bilder"
    });
    $.__views.labelView.add($.__views.testLabel2);
    $.__views.testLabel3 = Ti.UI.createLabel({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        left: 10,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "bold"
        },
        borderColor: "green",
        borderWidth: 3,
        id: "testLabel3",
        text: "Historier"
    });
    $.__views.labelView.add($.__views.testLabel3);
    $.__views.test3View = Ti.UI.createView({
        borderColor: "green",
        borderWidth: 3,
        id: "test3View"
    });
    $.__views.test2View.add($.__views.test3View);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Hello");
    Ti.API.info("Entering: " + $model.get("title"));
    Ti.API.info("Starting picturegallery: " + $model.get("title"));
    var pictureGalleryController = Alloy.createController("pictureGallery", {
        $model: $model
    });
    $.test1View.add(pictureGalleryController.getView());
    Ti.API.info("Starting picturegallery: " + $model.get("title"));
    var storyGalleryController = Alloy.createController("story", {
        $model: $model
    });
    $.test3View.add(storyGalleryController.getView());
    $.stedrWall.addEventListener("close", function() {
        Ti.API.info("Destroying: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;