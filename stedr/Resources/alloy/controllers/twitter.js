function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "twitter";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.twitterView = Ti.UI.createWindow({
        id: "twitterView"
    });
    $.__views.twitterView && $.addTopLevelView($.__views.twitterView);
    $.__views.twitterText = Ti.UI.createLabel({
        id: "twitterText"
    });
    $.__views.twitterView.add($.__views.twitterText);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var shareButton = Ti.UI.createButton({
        width: 90,
        bottom: 10,
        height: 30,
        title: 'Tweet!"'
    });
    $.twitterView.add(shareButton);
    var social = require("alloy/social");
    var twitter = social.create({
        site: "Twitter",
        consumerKey: "gHaiZb9KH9icQV5YRmIdA",
        consumerSecret: "v1hbUrM4rymaoE9Wry4ASZ6xxgSGKYDzUqtMStLhd8"
    });
    shareButton.addEventListener("click", function() {
        twitter.authorize(function() {
            Ti.API.info("Authorized!");
        });
        Ti.API.info(twitter.isAuthorized());
        twitter.share({
            message: "Hello, world!",
            success: function() {
                Ti.API.info("Tweeted!");
            },
            error: function(error) {
                Ti.API.info("Oh no! " + error);
            }
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;