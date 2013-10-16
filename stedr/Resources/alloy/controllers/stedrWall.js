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
        id: "welcomeWall",
        title: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.wallTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "wallTitle"
    });
    $.__views.welcomeWall.add($.__views.wallTitle);
    $.__views.wallImages = Ti.UI.createImageView({
        id: "wallImages"
    });
    $.__views.welcomeWall.add($.__views.wallImages);
    $.__views.wallDesc = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "wallDesc",
        text: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.welcomeWall.add($.__views.wallDesc);
    $.__views.__alloyId13 = Ti.UI.createTab({
        title: "Wall",
        color: "#00ff00",
        window: $.__views.welcomeWall,
        id: "__alloyId13"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId13);
    $.__views.storyTab = Ti.UI.createWindow({
        id: "storyTab",
        title: "Stories"
    });
    $.__views.storyLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "storyLabel"
    });
    $.__views.storyTab.add($.__views.storyLabel);
    $.__views.__alloyId14 = Ti.UI.createTab({
        title: "Stories",
        color: "#00ff00",
        window: $.__views.storyTab,
        id: "__alloyId14"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId14);
    $.__views.stedrWall && $.addTopLevelView($.__views.stedrWall);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;