function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "instagramView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.instagramView = Ti.UI.createWindow({
        backgroundColor: "#40B0D2",
        layout: "vertical",
        exitOnClose: "false",
        navBarHidden: "true",
        id: "instagramView"
    });
    $.__views.instagramView && $.addTopLevelView($.__views.instagramView);
    $.__views.pictureView = Ti.UI.createView({
        top: "10%",
        id: "pictureView"
    });
    $.__views.instagramView.add($.__views.pictureView);
    $.__views.instagramPicture = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        id: "instagramPicture"
    });
    $.__views.pictureView.add($.__views.instagramPicture);
    $.__views.userName = Ti.UI.createLabel({
        color: "white",
        font: {
            color: "white",
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "userName"
    });
    $.__views.instagramView.add($.__views.userName);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Model: " + JSON.stringify($model.get("fullName")));
    $.pictureView.setWidth(Titanium.Platform.displayCaps.platformWidth);
    $.pictureView.setHeight(Titanium.Platform.displayCaps.platformWidth);
    $.instagramPicture.setImage($model.get("url"));
    $.userName.setText("@" + $model.get("fullName"));
    $.instagramView.addEventListener("close", function() {
        Ti.API.info("Destroying instagramview");
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;