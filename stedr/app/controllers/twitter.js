/*
 * Require Codebird, twitter API
 */
var Codebird = require('codebird');
var cb = new Codebird();
cb.setConsumerKey('gHaiZb9KH9icQV5YRmIdA', 'v1hbUrM4rymaoE9Wry4ASZ6xxgSGKYDzUqtMStLhd8');
var accessToken = null;
var accessTokenSecret = null;

var bearerToken = Ti.App.Properties.getString('TwitterBearerToken', null);
if (bearerToken == null) {
	cb.__call('oauth2_token', {}, function(reply) {
		var bearer_token = reply.access_token;
		cb.setBearerToken(bearer_token);
		Ti.App.Properties.setString('TwitterBearerToken', bearer_token);
		Ti.API.info("Token: " + bearer_token);
	});
} else {
	Ti.API.info("We do have a bearer token: " + bearerToken);
	cb.setBearerToken(bearerToken);
}

fetchTwitter();

/*
 * Fetch twitter statuses with q as the given tag
 */
function fetchTwitter() {
	cb.__call('search_tweets', "q=" + Ti.Network.encodeURIComponent("#nidarosdomen"), function(reply) {
		var row = Alloy.createController('twitterRow', {
			"$model" : reply.statuses
		});
		$.twitterStatusesView.add(row.getView());
	}, true // this parameter required
	);
}

function tweet() {
	Ti.API.info("Trying to tweet");
	var text = $.tweetText.getValue();
	if (text.length > 140) {
		Ti.UI.createNotification({
			message : "Sorry, your text is too long",
			duration : Ti.UI.NOTIFICATION_DURATION_LONG
		}).show();
		return;
	} else {
		cb.__call("statuses_update", {
			"status" : text
		}, function(reply) {
			Ti.API.info("Reply: ");
			if (reply.httpstatus == 200) {
				$.tweetText.setValue("");
				$.tweetText.setHintText("You've just tweeted. Tweet again?");
				Ti.UI.createNotification({
					message : "You just tweeted :)",
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				}).show();
				fetchTwitter();
			} else {
				Ti.API.warn(reply.errors[0].message);
				Ti.UI.createNotification({
					message : "Sorry, something went wrong",
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				}).show();
			}
		});
		Ti.API.info("HALLO?");
	}
}


$.tweetText.addEventListener('click', function(){
	$.charCounter.setText("("+ $.tweetText.getValue.length +"/140)");
});

/*
 * Most of the following code is copy-pasted from a solution created by Rogichi (GitHub).
 * Source code: https://gist.github.com/Rogichi   (app.js)
 */

///////////LOAD ACCESS TOKEN
loadAccessToken = function(pService) {
	Ti.API.info('Loading access token for service [' + pService + '].');
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, pService + '.config');
	if (file.exists() == false) {
		return;
	}
	var contents = file.read();
	if (contents == null) {
		return;
	}
	var config;
	try {
		config = JSON.parse(contents.text);
	} catch(ex) {
		return;
	}
	if (!config) {
		return;
	}
	if (config.accessToken) {
		accessToken = config.accessToken;
	}
	if (config.accessTokenSecret) {
		accessTokenSecret = config.accessTokenSecret;
	}
	Ti.API.info('Loading access token: done [accessToken:' + accessToken + '][accessTokenSecret:' + accessTokenSecret + '].');
};

///////////SAVE ACCESS TOKEN
saveAccessToken = function(pService) {
	Ti.API.info('Saving access token [' + pService + '].');
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, pService + '.config');
	if (file == null) {
		file = Ti.Filesystem.createFile(Ti.Filesystem.applicationDataDirectory, pService + '.config');
	}
	file.write(JSON.stringify({
		accessToken : accessToken,
		accessTokenSecret : accessTokenSecret
	}));
	Ti.API.info('Saving access token: done.');
};

$.tweetButton.addEventListener('click', function(e) {
	loadAccessToken('twitter');
	if (accessTokenSecret != null && accessToken != null) {
		cb.setToken(accessToken, accessTokenSecret);
		tweet();
	} else {
		cb.__call("oauth_requestToken", {
			oauth_callback : "oob"
		}, function(reply) {
			Ti.API.info("TOKEN: " + reply.oauth_token + ", " + reply.oauth_token_secret);
			// stores it
			cb.setToken(reply.oauth_token, reply.oauth_token_secret);
			// gets the authorize screen URL
			cb.__call("oauth_authorize", {}, function(auth_url) {
				//window.codebird_auth = window.open(auth_url);
				Ti.API.info(auth_url);
				var offset = 0;
				if (Ti.Android) {
					offset = '10dp';
				}
				var window = Titanium.UI.createWebView({
					top : offset,
					right : offset,
					bottom : offset,
					left : offset,
					url : auth_url
				});
				closeLabel = Ti.UI.createLabel({
					textAlign : 'right',
					font : {
						fontWeight : 'bold',
						fontSize : '12pt'
					},
					text : '(X)',
					top : 0,
					right : 0,
					height : 14
				});
				window.add(closeLabel);
				closeLabel.addEventListener('click', function(e) {
					$.twitterStatusesView.remove(window);
				});

				var destroyAuthorizeUI = function() {
					Ti.API.info('destroyAuthorizeUI');
					// remove the UI
					try {
						window.removeEventListener('load', authorizeUICallback);
						$.twitterStatusesView.remove(window);
						window = null;
					} catch(ex) {
						Ti.API.info('Cannot destroy the authorize UI. Ignoring.');
					}
				};

				var authorizeUICallback = function(e) {
					Ti.API.info('authorizeUILoaded');
					var val = window.evalJS('window.document.querySelector(\'kbd[aria-labelledby="code-desc"] > code\').innerHTML');
					Ti.API.info(val);
					if (val) {
						destroyAuthorizeUI();
						cb.__call("oauth_accessToken", {
							oauth_verifier : val
						}, function(reply) {
							// store the authenticated token, which may be different from the request token (!)
							cb.setToken(reply.oauth_token, reply.oauth_token_secret);

							Ti.API.info(reply);
							tweet();
							accessToken = reply.oauth_token;
							accessTokenSecret = reply.oauth_token_secret;
							saveAccessToken('twitter');
						});
					}
				};
				window.addEventListener('load', authorizeUICallback);
				$.twitterStatusesView.add(window);
			});
		});
	}
});