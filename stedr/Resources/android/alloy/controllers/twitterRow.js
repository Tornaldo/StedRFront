function Controller() {
    function __alloyId23(e) {
        if (e && e.fromAdapter) return;
        __alloyId23.opts || {};
        var models = __alloyId22.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId7 = models[i];
            __alloyId7.__transform = transformFunction(__alloyId7);
            var __alloyId9 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId9);
            showTweet ? __alloyId9.addEventListener("click", showTweet) : __defers["__alloyId9!click!showTweet"] = true;
            var __alloyId11 = Ti.UI.createImageView({
                height: "50dp",
                width: "50dp",
                top: "10dp",
                left: "10dp",
                image: "undefined" != typeof __alloyId7.__transform["profileImage"] ? __alloyId7.__transform["profileImage"] : __alloyId7.get("profileImage")
            });
            __alloyId9.add(__alloyId11);
            var __alloyId13 = Ti.UI.createView({
                top: "10dp",
                left: "70dp",
                height: "22dp",
                layout: "horizontal"
            });
            __alloyId9.add(__alloyId13);
            var __alloyId15 = Ti.UI.createLabel({
                height: "22dp",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "17sp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId7.__transform["userName"] ? __alloyId7.__transform["userName"] : __alloyId7.get("userName")
            });
            __alloyId13.add(__alloyId15);
            var __alloyId17 = Ti.UI.createLabel({
                height: "22dp",
                left: "5dp",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "17sp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId7.__transform["screenName"] ? __alloyId7.__transform["screenName"] : __alloyId7.get("screenName")
            });
            __alloyId13.add(__alloyId17);
            var __alloyId19 = Ti.UI.createLabel({
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
                text: "undefined" != typeof __alloyId7.__transform["text"] ? __alloyId7.__transform["text"] : __alloyId7.get("text")
            });
            __alloyId9.add(__alloyId19);
            var __alloyId21 = Ti.UI.createLabel({
                top: "32dp",
                left: "70dp",
                height: "18dp",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "14sp",
                    fontStyle: "italic",
                    fontWeight: "normal"
                },
                text: "undefined" != typeof __alloyId7.__transform["created"] ? __alloyId7.__transform["created"] : __alloyId7.get("created")
            });
            __alloyId9.add(__alloyId21);
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
    var __alloyId22 = Alloy.Collections["tweets"] || tweets;
    __alloyId22.on("fetch destroy change add remove reset", __alloyId23);
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    exports.destroy = function() {
        __alloyId22.off("fetch destroy change add remove reset", __alloyId23);
    };
    _.extend($, $.__views);
    Alloy.Collections.tweets.reset($model);
    $.tableView.addEventListener("close", function() {
        Ti.API.info("Destroying twitter row");
        $.destroy();
    });
    __defers["__alloyId9!click!showTweet"] && __alloyId9.addEventListener("click", showTweet);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;