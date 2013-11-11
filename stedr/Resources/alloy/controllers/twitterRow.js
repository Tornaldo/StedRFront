function Controller() {
    function __alloyId21() {
        __alloyId21.opts || {};
        var models = __alloyId20.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId6 = models[i];
            __alloyId6.__transform = transformFunction(__alloyId6);
            var __alloyId7 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId7);
            showTweet ? __alloyId7.addEventListener("click", showTweet) : __defers["__alloyId7!click!showTweet"] = true;
            var __alloyId9 = Ti.UI.createImageView({
                height: "50dp",
                width: "50dp",
                top: "10dp",
                left: "10dp",
                image: "undefined" != typeof __alloyId6.__transform["profileImage"] ? __alloyId6.__transform["profileImage"] : __alloyId6.get("profileImage")
            });
            __alloyId7.add(__alloyId9);
            var __alloyId11 = Ti.UI.createView({
                top: "10dp",
                left: "70dp",
                height: "22dp",
                layout: "horizontal"
            });
            __alloyId7.add(__alloyId11);
            var __alloyId13 = Ti.UI.createLabel({
                height: "22dp",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "17sp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId6.__transform["userName"] ? __alloyId6.__transform["userName"] : __alloyId6.get("userName")
            });
            __alloyId11.add(__alloyId13);
            var __alloyId15 = Ti.UI.createLabel({
                height: "22dp",
                left: "5dp",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "17sp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId6.__transform["screenName"] ? __alloyId6.__transform["screenName"] : __alloyId6.get("screenName")
            });
            __alloyId11.add(__alloyId15);
            var __alloyId17 = Ti.UI.createLabel({
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
                text: "undefined" != typeof __alloyId6.__transform["text"] ? __alloyId6.__transform["text"] : __alloyId6.get("text")
            });
            __alloyId7.add(__alloyId17);
            var __alloyId19 = Ti.UI.createLabel({
                top: "32dp",
                left: "70dp",
                height: "18dp",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "14sp",
                    fontStyle: "italic",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId6.__transform["created"] ? __alloyId6.__transform["created"] : __alloyId6.get("created")
            });
            __alloyId7.add(__alloyId19);
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
    function showTweet(evt) {
        Ti.API.info(evt);
        Ti.API.info(evt.source);
        Ti.API.info(JSON.stringify(evt.source));
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
    var __alloyId20 = Alloy.Collections["tweets"] || tweets;
    __alloyId20.on("fetch destroy change add remove reset", __alloyId21);
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    exports.destroy = function() {
        __alloyId20.off("fetch destroy change add remove reset", __alloyId21);
    };
    _.extend($, $.__views);
    Alloy.Collections.tweets.reset($model);
    __defers["__alloyId7!click!showTweet"] && __alloyId7.addEventListener("click", showTweet);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;