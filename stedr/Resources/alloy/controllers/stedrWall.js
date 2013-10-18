function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "stedrWall";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.stedrWall = Ti.UI.createTabGroup({
        id: "stedrWall"
    });
    $.__views.welcomeWall = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "welcomeWall",
        title: "Velkommen"
    });
    $.__views.wallTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: true,
        color: "#000",
        font: {
            fontFamily: "Helvetica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "wallTitle",
        text: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.welcomeWall.add($.__views.wallTitle);
    var __alloyId14 = [];
    $.__views.imageScroller = Ti.UI.createScrollableView({
        views: __alloyId14,
        id: "imageScroller",
        showPagingControl: "true"
    });
    $.__views.welcomeWall.add($.__views.imageScroller);
    $.__views.__alloyId13 = Ti.UI.createTab({
        title: "Wall",
        color: "#00ff00",
        window: $.__views.welcomeWall,
        id: "__alloyId13"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId13);
    $.__views.storyTab = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "storyTab",
        title: "Stories"
    });
    $.__views.storyLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: true,
        color: "#000",
        font: {
            fontFamily: "Helvetica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "storyLabel"
    });
    $.__views.storyTab.add($.__views.storyLabel);
    $.__views.__alloyId15 = Ti.UI.createTab({
        title: "Historier",
        color: "#00ff00",
        window: $.__views.storyTab,
        id: "__alloyId15"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId15);
    $.__views.stedrWall && $.addTopLevelView($.__views.stedrWall);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = $model;
    Ti.API.info("Entering: " + data.get("name"));
    var imageUrlList = data.get("pictures");
    for (i = 0; imageUrlList.length > i; i++) {
        var wallImage = Ti.UI.createImageView({
            image: imageUrlList[i].url
        });
        $.imageScroller.addView(wallImage);
    }
    $.stedrWall.addEventListener("close", function() {
        Ti.API.info("Destroying: " + data.get("name"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;