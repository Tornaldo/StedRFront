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
        navBarHidden: "false",
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
        left: "15dp",
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
    $.__views.hei = Ti.UI.createView({
        height: "20dp",
        id: "hei",
        layout: "horizontal"
    });
    $.__views.instagramView.add($.__views.hei);
    $.__views.likesicon = Ti.UI.createImageView({
        left: "15dp",
        id: "likesicon",
        image: "/images/instagramlikesicon.png"
    });
    $.__views.hei.add($.__views.likesicon);
    $.__views.numberoflikeslabel = Ti.UI.createLabel({
        left: "15dp",
        color: "white",
        font: {
            color: "white",
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "numberoflikeslabel"
    });
    $.__views.hei.add($.__views.numberoflikeslabel);
    $.__views.commentsicon = Ti.UI.createImageView({
        left: "15dp",
        id: "commentsicon",
        image: "/images/instagramcommentsicon.png"
    });
    $.__views.hei.add($.__views.commentsicon);
    $.__views.numberofcommentslabel = Ti.UI.createLabel({
        left: "15dp",
        color: "white",
        font: {
            color: "white",
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "numberofcommentslabel"
    });
    $.__views.hei.add($.__views.numberofcommentslabel);
    $.__views.hei2 = Ti.UI.createView({
        id: "hei2"
    });
    $.__views.instagramView.add($.__views.hei2);
    $.__views.caption = Ti.UI.createLabel({
        left: "15dp",
        color: "white",
        font: {
            color: "white",
            fontFamily: "Helvetica",
            fontSize: "15dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "caption"
    });
    $.__views.hei2.add($.__views.caption);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Fullname: " + $model.get("fullName"));
    Ti.API.info("Likes: " + $model.get("likesCount"));
    Ti.API.info("Comments: " + $model.get("commentCount"));
    Ti.API.info("Caption: " + $model.get("caption"));
    $.pictureView.setWidth(Titanium.Platform.displayCaps.platformWidth);
    $.pictureView.setHeight(Titanium.Platform.displayCaps.platformWidth);
    $.userName.setText("@" + $model.get("fullName"));
    $.instagramPicture.setImage($model.get("url"));
    $.numberoflikeslabel.setText($model.get("likesCount") + " likes");
    $.numberofcommentslabel.setText($model.get("commentCount") + " comments");
    $.caption.setText($model.get("caption"));
    $.instagramView.addEventListener("close", function() {
        Ti.API.info("Destroying instagramview");
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;