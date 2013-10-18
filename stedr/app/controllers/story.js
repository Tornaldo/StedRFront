var storyCollection = Alloy.Collections.story;

storyCollection.fetch({
	urlparams : {
		"wallId" : 2, // bytt ut med dynamikk
	},
	success : function() {
		_.each(storyCollection.models, function(element, index, list) {
		});
		Ti.API.info(storyCollection);
	},
	error : function() {
		Ti.API.error("hmm - this is not good!");
	}
});