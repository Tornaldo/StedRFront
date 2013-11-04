function Controller() {
    function fetchTwitter() {
        cb.__call("search_tweets", "q=" + Ti.Network.encodeURIComponent("#nidarosdomen"), function(reply) {
            var row = Alloy.createController("twitterRow", {
                $model: reply.statuses
            });
            $.twitterStatusesView.add(row.getView());
        }, true);
    }
    function tweet() {
        Ti.API.info("Trying to tweet");
        cb.__call("statuses_update", {
            status: "PLINGPLONG"
        }, function(reply) {
            Ti.API.info("Reply tweet: " + JSON.stringify(reply));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "twitter";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.twitterView = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "twitterView",
        layout: "vertical"
    });
    $.__views.twitterView && $.addTopLevelView($.__views.twitterView);
    $.__views.tweetText = Ti.UI.createTextField({
        top: "10dp",
        left: "10dp",
        right: "10dp",
        width: Ti.UI.FILL,
        id: "tweetText",
        hintText: "Enter your tweet... (max 140 letters)"
    });
    $.__views.twitterView.add($.__views.tweetText);
    $.__views.tweetButton = Ti.UI.createButton({
        id: "tweetButton",
        title: "Tweet!"
    });
    $.__views.twitterView.add($.__views.tweetButton);
    tweet ? $.__views.tweetButton.addEventListener("click", tweet) : __defers["$.__views.tweetButton!click!tweet"] = true;
    $.__views.twitterStatusesView = Ti.UI.createView({
        id: "twitterStatusesView"
    });
    $.__views.twitterView.add($.__views.twitterStatusesView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Codebird = require("codebird");
    var cb = new Codebird();
    cb.setConsumerKey("gHaiZb9KH9icQV5YRmIdA", "v1hbUrM4rymaoE9Wry4ASZ6xxgSGKYDzUqtMStLhd8");
    var bearerToken = Ti.App.Properties.getString("TwitterBearerToken", null);
    if (null == bearerToken) cb.__call("oauth2_token", {}, function(reply) {
        var bearer_token = reply.access_token;
        cb.setBearerToken(bearer_token);
        Ti.App.Properties.setString("TwitterBearerToken", bearer_token);
        Ti.API.info("Token: " + bearer_token);
        fetchTwitter();
    }); else {
        Ti.API.info("We do have a bearer token...");
        cb.setBearerToken(bearerToken);
        fetchTwitter();
    }
    __defers["$.__views.tweetButton!click!tweet"] && $.__views.tweetButton.addEventListener("click", tweet);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;