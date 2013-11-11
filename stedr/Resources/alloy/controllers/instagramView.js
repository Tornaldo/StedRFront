function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "instagramView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.instagramView = Ti.UI.createView({
        id: "instagramView"
    });
    $.__views.instagramView && $.addTopLevelView($.__views.instagramView);
    $.__views.instagramPicture = Ti.UI.createImage({
        id: "instagramPicture"
    });
    $.__views.instagramView.add($.__views.instagramPicture);
    $.__views.userName = Ti.UI.createLabel({
        id: "userName"
    });
    $.__views.instagramView.add($.__views.userName);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.userName.setText($model.get("fullName"));
    $.url.setText($model.get("url"));
    $.instagramView.addEventListener("close", function() {
        Ti.API.info("Destroying: ");
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;