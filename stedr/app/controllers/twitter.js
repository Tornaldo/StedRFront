var shareButton = Ti.UI.createButton({
	width : 90,
	bottom : 10,
	height : 30,
	title : 'Tweet!"'
});
$.twitterView.add(shareButton);

var social = require('alloy/social');
var twitter = social.create({
	site : 'Twitter',
	consumerKey : 'gHaiZb9KH9icQV5YRmIdA',
	consumerSecret : 'v1hbUrM4rymaoE9Wry4ASZ6xxgSGKYDzUqtMStLhd8'
});



shareButton.addEventListener('click', function() {
	twitter.authorize(function() {
		Ti.API.info('Authorized!');
	});
	Ti.API.info(twitter.isAuthorized());
	twitter.share({
		message : 'Hello, world!',
		success : function() {
			Ti.API.info('Tweeted!');
		},
		error : function(error) {
			Ti.API.info('Oh no! ' + error);
		}
	});
}); 