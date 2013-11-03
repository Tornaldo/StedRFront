/*
 * Require Codebird, twitter API
 */
var Codebird = require('codebird');
var cb = new Codebird();
cb.setConsumerKey('gHaiZb9KH9icQV5YRmIdA', 'v1hbUrM4rymaoE9Wry4ASZ6xxgSGKYDzUqtMStLhd8');

var bearerToken = Ti.App.Properties.getString('TwitterBearerToken', null);
if (bearerToken == null) {
	cb.__call('oauth2_token', {}, function(reply) {
		var bearer_token = reply.access_token;
		cb.setBearerToken(bearer_token);
		Ti.App.Properties.setString('TwitterBearerToken', bearer_token);
		Ti.API.info("Token: " + bearer_token);
		fetchTwitter();
	});
} else {
	Ti.API.info("We do have a bearer token...");
	cb.setBearerToken(bearerToken);
	fetchTwitter();
}

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
	cb.__call("statuses_update", {
		"status" : Ti.Network.encodeURIComponent("#PLINGPLONG")
	}, function(reply) {
		Ti.API.info("Reply tweet: " + JSON.stringify(reply));
	});
}