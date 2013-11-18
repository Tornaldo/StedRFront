function Controller() {
    function __alloyId20() {
        __alloyId20.opts || {};
        var models = __alloyId19.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = transformFunction(__alloyId5);
            var __alloyId6 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId6);
            showTweet ? __alloyId6.addEventListener("click", showTweet) : __defers["__alloyId6!click!showTweet"] = true;
            var __alloyId8 = Ti.UI.createImageView({
                height: "50dp",
                width: "50dp",
                top: "10dp",
                left: "10dp",
                image: "undefined" != typeof __alloyId5.__transform["profileImage"] ? __alloyId5.__transform["profileImage"] : __alloyId5.get("profileImage")
            });
            __alloyId6.add(__alloyId8);
            var __alloyId10 = Ti.UI.createView({
                top: "10dp",
                left: "70dp",
                height: "22dp",
                layout: "horizontal"
            });
            __alloyId6.add(__alloyId10);
            var __alloyId12 = Ti.UI.createLabel({
                height: "22dp",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "17sp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId5.__transform["userName"] ? __alloyId5.__transform["userName"] : __alloyId5.get("userName")
            });
            __alloyId10.add(__alloyId12);
            var __alloyId14 = Ti.UI.createLabel({
                height: "22dp",
                left: "5dp",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "17sp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId5.__transform["screenName"] ? __alloyId5.__transform["screenName"] : __alloyId5.get("screenName")
            });
            __alloyId10.add(__alloyId14);
            var __alloyId16 = Ti.UI.createLabel({
                top: "52dp",
                left: "70dp",
                bottom: "10dp",
                textAlign: "left",
                height: Ti.UI.SIZE,
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "14sp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId5.__transform["text"] ? __alloyId5.__transform["text"] : __alloyId5.get("text")
            });
            __alloyId6.add(__alloyId16);
            var __alloyId18 = Ti.UI.createLabel({
                top: "32dp",
                left: "70dp",
                height: "18dp",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "14sp",
                    fontStyle: "italic",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId5.__transform["created"] ? __alloyId5.__transform["created"] : __alloyId5.get("created")
            });
            __alloyId6.add(__alloyId18);
        }
        $.__views.tableView.setData(rows);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.userName = transform.user.name;
        transform.screenName = "@" + transform.user.screen_name;
        transform.created = transform.created_at.slice(0, 16);
        transform.profileImage = transform.user.profile_image_url_https;
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
    var __defers = {};
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    var __alloyId19 = Alloy.Collections["tweets"] || tweets;
    __alloyId19.on("fetch destroy change add remove reset", __alloyId20);
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    exports.destroy = function() {
        __alloyId19.off("fetch destroy change add remove reset", __alloyId20);
    };
    _.extend($, $.__views);
    Alloy.Collections.tweets.reset($model);
    $.tableView.addEventListener("close", function() {
        Ti.API.info("Destroying twitter row");
        $.destroy();
    });
    __defers["__alloyId6!click!showTweet"] && __alloyId6.addEventListener("click", showTweet);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;