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
        var text = $.tweetText.getValue();
        if (text.length > 140) {
            Ti.UI.createNotification({
                message: "Sorry, your text is too long",
                duration: Ti.UI.NOTIFICATION_DURATION_LONG
            }).show();
            return;
        }
        cb.__call("statuses_update", {
            status: text
        }, function(reply) {
            Ti.API.info("Reply: ");
            if (200 == reply.httpstatus) Ti.UI.createNotification({
                message: "You just tweeted :) The tweet will appear on twitter in a few minutes",
                duration: Ti.UI.NOTIFICATION_DURATION_LONG
            }).show(); else {
                Ti.API.warn(reply.errors[0].message);
                Ti.UI.createNotification({
                    message: "Sorry, something went wrong",
                    duration: Ti.UI.NOTIFICATION_DURATION_LONG
                }).show();
            }
        });
        Ti.API.info("HALLO?");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "twitter";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
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
    $.__views.twitterStatusesView = Ti.UI.createView({
        id: "twitterStatusesView"
    });
    $.__views.twitterView.add($.__views.twitterStatusesView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Codebird = require("codebird");
    var cb = new Codebird();
    cb.setConsumerKey("gHaiZb9KH9icQV5YRmIdA", "v1hbUrM4rymaoE9Wry4ASZ6xxgSGKYDzUqtMStLhd8");
    var accessToken = null;
    var accessTokenSecret = null;
    var bearerToken = Ti.App.Properties.getString("TwitterBearerToken", null);
    if (null == bearerToken) cb.__call("oauth2_token", {}, function(reply) {
        var bearer_token = reply.access_token;
        cb.setBearerToken(bearer_token);
        Ti.App.Properties.setString("TwitterBearerToken", bearer_token);
        Ti.API.info("Token: " + bearer_token);
    }); else {
        Ti.API.info("We do have a bearer token: " + bearerToken);
        cb.setBearerToken(bearerToken);
    }
    fetchTwitter();
    loadAccessToken = function(pService) {
        Ti.API.info("Loading access token for service [" + pService + "].");
        var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, pService + ".config");
        if (false == file.exists()) return;
        var contents = file.read();
        if (null == contents) return;
        var config;
        try {
            config = JSON.parse(contents.text);
        } catch (ex) {
            return;
        }
        if (!config) return;
        config.accessToken && (accessToken = config.accessToken);
        config.accessTokenSecret && (accessTokenSecret = config.accessTokenSecret);
        Ti.API.info("Loading access token: done [accessToken:" + accessToken + "][accessTokenSecret:" + accessTokenSecret + "].");
    };
    saveAccessToken = function(pService) {
        Ti.API.info("Saving access token [" + pService + "].");
        var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, pService + ".config");
        null == file && (file = Ti.Filesystem.createFile(Ti.Filesystem.applicationDataDirectory, pService + ".config"));
        file.write(JSON.stringify({
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
        }));
        Ti.API.info("Saving access token: done.");
    };
    $.tweetButton.addEventListener("click", function() {
        loadAccessToken("twitter");
        if (null != accessTokenSecret && null != accessToken) {
            cb.setToken(accessToken, accessTokenSecret);
            tweet();
        } else cb.__call("oauth_requestToken", {
            oauth_callback: "oob"
        }, function(reply) {
            Ti.API.info("TOKEN: " + reply.oauth_token + ", " + reply.oauth_token_secret);
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);
            cb.__call("oauth_authorize", {}, function(auth_url) {
                Ti.API.info(auth_url);
                var offset = 0;
                Ti.Android && (offset = "10dp");
                var window = Titanium.UI.createWebView({
                    top: offset,
                    right: offset,
                    bottom: offset,
                    left: offset,
                    url: auth_url
                });
                closeLabel = Ti.UI.createLabel({
                    textAlign: "right",
                    font: {
                        fontWeight: "bold",
                        fontSize: "12pt"
                    },
                    text: "(X)",
                    top: 0,
                    right: 0,
                    height: 14
                });
                window.add(closeLabel);
                closeLabel.addEventListener("click", function() {
                    $.twitterStatusesView.remove(window);
                });
                var destroyAuthorizeUI = function() {
                    Ti.API.info("destroyAuthorizeUI");
                    try {
                        window.removeEventListener("load", authorizeUICallback);
                        $.twitterStatusesView.remove(window);
                        window = null;
                    } catch (ex) {
                        Ti.API.info("Cannot destroy the authorize UI. Ignoring.");
                    }
                };
                var authorizeUICallback = function() {
                    Ti.API.info("authorizeUILoaded");
                    var val = window.evalJS("window.document.querySelector('kbd[aria-labelledby=\"code-desc\"] > code').innerHTML");
                    Ti.API.info(val);
                    if (val) {
                        destroyAuthorizeUI();
                        cb.__call("oauth_accessToken", {
                            oauth_verifier: val
                        }, function(reply) {
                            cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                            Ti.API.info(reply);
                            tweet();
                            accessToken = reply.oauth_token;
                            accessTokenSecret = reply.oauth_token_secret;
                            saveAccessToken("twitter");
                        });
                    }
                };
                window.addEventListener("load", authorizeUICallback);
                $.twitterStatusesView.add(window);
            });
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;