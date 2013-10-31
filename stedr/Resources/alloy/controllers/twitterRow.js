function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "twitterRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.image = Ti.UI.createImageView({
        id: "image"
    });
    $.__views.row.add($.__views.image);
    $.__views.name = Ti.UI.createLabel({
        id: "name"
    });
    $.__views.row.add($.__views.name);
    $.__views.time = Ti.UI.createLabel({
        id: "time"
    });
    $.__views.row.add($.__views.time);
    $.__views.text = Ti.UI.createLabel({
        id: "text"
    });
    $.__views.row.add($.__views.text);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;