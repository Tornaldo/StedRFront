function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "instagramView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.instagramView = Ti.UI.createWindow({
        layout: "vertical",
        exitOnClose: "false",
        navBarHidden: "false",
        id: "instagramView"
    });
    $.__views.instagramView && $.addTopLevelView($.__views.instagramView);
    $.__views.__alloyId2 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#40B0D2",
        id: "__alloyId2"
    });
    $.__views.instagramView.add($.__views.__alloyId2);
    $.__views.igView = Ti.UI.createView({
        id: "igView"
    });
    $.__views.__alloyId2.add($.__views.igView);
    $.__views.userName = Ti.UI.createLabel({
        id: "userName"
    });
    $.__views.__alloyId2.add($.__views.userName);
    $.__views.url = Ti.UI.createLabel({
        id: "url"
    });
    $.__views.__alloyId2.add($.__views.url);
    $.__views.igv = Alloy.createWidget("tiflexigrid", "widget", {
        id: "igv",
        __parentSymbol: $.__views.instagramView
    });
    $.__views.igv.setParent($.__views.instagramView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Hello");
    Ti.API.info("Entering: ");
    $.igv.createGrid({
        columns: 1,
        space: 10,
        data: $model,
        layout: "gallery",
        params: {
            padding: 5,
            showTitle: true,
            backgroundColor: "#FFFFFF",
            gridColor: "#40B0D2"
        },
        width: Titanium.Platform.DisplayCaps.platformWidth
    });
    $.igView.addEventListener("close", function() {
        Ti.API.info("Destroying: ");
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;