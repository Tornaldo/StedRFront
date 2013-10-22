function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.storyView = Ti.UI.createWindow({
        layout: "vertical",
        exitOnClose: "false",
        navBarHidden: "false",
        id: "storyView"
    });
    $.__views.storyView && $.addTopLevelView($.__views.storyView);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        text: "",
        id: "__alloyId13"
    });
    $.__views.storyView.add($.__views.__alloyId13);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Hello");
    Ti.API.info("Entering: " + $model.get("title"));
    $.storyView.addEventListener("close", function() {
        Ti.API.info("Destroying: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;