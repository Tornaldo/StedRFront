function Controller() {
    function __alloyId11() {
        __alloyId11.opts || {};
        var models = __alloyId10.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = transformFunction(__alloyId5);
            var __alloyId6 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId6);
            var __alloyId7 = Ti.UI.createImageView({
                image: "undefined" != typeof __alloyId5.__transform["profileImage"] ? __alloyId5.__transform["profileImage"] : __alloyId5.get("profileImage")
            });
            __alloyId6.add(__alloyId7);
            var __alloyId8 = Ti.UI.createLabel({
                backgroundColor: "yellow",
                text: "undefined" != typeof __alloyId5.__transform["userName"] ? __alloyId5.__transform["userName"] : __alloyId5.get("userName")
            });
            __alloyId6.add(__alloyId8);
            var __alloyId9 = Ti.UI.createLabel({
                backgroundColor: "yellow",
                text: "undefined" != typeof __alloyId5.__transform["text"] ? __alloyId5.__transform["text"] : __alloyId5.get("text")
            });
            __alloyId6.add(__alloyId9);
        }
        $.__views.twitterRow.setData(rows);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        Ti.API.info("TRANSFORM " + transform.profile_image_url_https);
        transform.userName = transform.user.name;
        transform.profileImage = transform.profile_image_url_https;
        transform.text = transform.text;
        return transform;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "twitterRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.twitterRow = Ti.UI.createTableView({
        backgroundColor: "blue",
        id: "twitterRow"
    });
    var __alloyId10 = Alloy.Collections["tweets"] || tweets;
    __alloyId10.on("fetch destroy change add remove reset", __alloyId11);
    $.__views.twitterRow && $.addTopLevelView($.__views.twitterRow);
    exports.destroy = function() {
        __alloyId10.off("fetch destroy change add remove reset", __alloyId11);
    };
    _.extend($, $.__views);
    Alloy.Collections.tweets.reset($model);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;