function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "instagram";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.instagram = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "instagram"
    });
    $.__views.instagram && $.addTopLevelView($.__views.instagram);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "Her kommer instagrambilder",
        id: "__alloyId0"
    });
    $.__views.instagram.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var instagramCollection = Alloy.Collections.instagram;
    instagramCollection.fetch({
        urlparams: {
            tag: "stedr"
        },
        success: function() {},
        error: function() {
            Ti.API.error("hmm - this is not good!");
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;