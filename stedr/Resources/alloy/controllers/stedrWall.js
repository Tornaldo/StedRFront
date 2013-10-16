function Controller() {
    function dataTransformation(_model) {
        Ti.API.info(_model.get("name"));
        return {
            name: _model.get("name")
        };
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "stedrWall";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.wallModel = Alloy.createModel("wall");
    $.__views.stedrWall = Ti.UI.createTabGroup({
        id: "stedrWall"
    });
    $.__views.welcomeWall = Ti.UI.createWindow({
        id: "welcomeWall",
        model: "$.wallModel",
        dataTransform: "dataTransformation"
    });
    $.__views.wallTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "wallTitle",
        model: "$.wallModel"
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
        text: ""
    });
    $.__views.welcomeWall.add($.__views.wallDesc);
    $.__views.__alloyId14 = Ti.UI.createTab({
        title: "Wall",
        color: "#00ff00",
        window: $.__views.welcomeWall,
        id: "__alloyId14"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId14);
    $.__views.__alloyId16 = Ti.UI.createWindow({
        title: "Stories",
        id: "__alloyId16"
    });
    $.__views.__alloyId17 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId15 = Ti.UI.createTab({
        title: "Stories",
        color: "#00ff00",
        window: $.__views.__alloyId16,
        id: "__alloyId15"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId15);
    $.__views.stedrWall && $.addTopLevelView($.__views.stedrWall);
    var __alloyId18 = function() {
        $.welcomeWall.title = _.isFunction($.wallModel.transform) ? $.wallModel.transform()["name"] : $.wallModel.get("name");
        $.welcomeWall.title = _.isFunction($.wallModel.transform) ? $.wallModel.transform()["name"] : $.wallModel.get("name");
        $.wallTitle.text = _.isFunction($.wallModel.transform) ? $.wallModel.transform()["name"] : $.wallModel.get("name");
        $.wallTitle.text = _.isFunction($.wallModel.transform) ? $.wallModel.transform()["name"] : $.wallModel.get("name");
    };
    $.wallModel.on("fetch change destroy", __alloyId18);
    exports.destroy = function() {
        $.wallModel.off("fetch change destroy", __alloyId18);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.wallModel = _.extend({}, $.wallModel, {
        transform: function() {
            return dataTransformation(this);
        }
    });
    $.wallModel.set(args.data || {});
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;