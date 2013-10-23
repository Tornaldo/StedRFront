var items = [];

var instagramCollection = Alloy.Collections.instagram;
	instagramCollection.fetch({
		urlparams : {
			"tag" : "stedr",
		//	dummytag
		//	"tag" : "stedr-" + $model.get('id'),
		},
		success : function(){
			
		},
		
		error : function() {
			Ti.API.error("hmm - this is not good!");
	}
});
