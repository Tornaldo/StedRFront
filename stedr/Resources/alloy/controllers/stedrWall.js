function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "stedrWall";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.wallModel = Alloy.createModel("wall");
    $.__views.mainStedrWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "mainStedrWindow"
    });
    $.__views.mainStedrWindow && $.addTopLevelView($.__views.mainStedrWindow);
    $.__views.test1View = Ti.UI.createView({
        borderColor: "green",
        borderWidth: 3,
        bottom: 1e3,
        id: "test1View"
    });
    $.__views.mainStedrWindow.add($.__views.test1View);
    $.__views.test2View = Ti.UI.createView({
        borderColor: "green",
        borderWidth: 3,
        top: 300,
        id: "test2View"
    });
    $.__views.mainStedrWindow.add($.__views.test2View);
    $.__views.testLabel2 = Ti.UI.createLabel({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        left: 10,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        borderColor: "green",
        borderWidth: 3,
        id: "testLabel2",
        text: "Bilder"
    });
    $.__views.test2View.add($.__views.testLabel2);
    $.__views.testLabel3 = Ti.UI.createLabel({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        right: 10,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        borderColor: "green",
        borderWidth: 3,
        id: "testLabel3",
        text: "Historier"
    });
    $.__views.test2View.add($.__views.testLabel3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Hello");
    $.wallModel.set($model);
    Ti.API.info("Entering: " + $.wallModel.get("title"));
    var galleryController = Alloy.createController("pictureGallery");
    $.test1View.add(galleryController.getView());
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;