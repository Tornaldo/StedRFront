function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "stedrWall";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.stedrWall = Ti.UI.createTabGroup({
        id: "stedrWall"
    });
    $.__views.__alloyId15 = Ti.UI.createWindow({
        title: "Tab 1",
        id: "__alloyId15"
    });
    $.__views.wallTitle = Ti.UI.createLabel({
        text: "TITLE OF WALL",
        id: "wallTitle"
    });
    $.__views.__alloyId15.add($.__views.wallTitle);
    $.__views.wallImages = Ti.UI.createImageView({
        id: "wallImages"
    });
    $.__views.__alloyId15.add($.__views.wallImages);
    $.__views.wallDesc = Ti.UI.createLabel({
        text: "Descripton",
        id: "wallDesc"
    });
    $.__views.__alloyId15.add($.__views.wallDesc);
    $.__views.__alloyId14 = Ti.UI.createTab({
        window: $.__views.__alloyId15,
        title: "Wall",
        id: "__alloyId14"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId14);
    $.__views.__alloyId17 = Ti.UI.createWindow({
        title: "Tab 2",
        id: "__alloyId17"
    });
    $.__views.__alloyId18 = Ti.UI.createLabel({
        text: "Stories",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId16 = Ti.UI.createTab({
        window: $.__views.__alloyId17,
        title: "Stories",
        id: "__alloyId16"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId16);
    $.__views.stedrWall && $.addTopLevelView($.__views.stedrWall);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;