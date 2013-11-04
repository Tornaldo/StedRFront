var instagramItems = [];

var instagramCollection = Alloy.Collections.instagram;

	instagramCollection.fetch({
		urlparams : {
			"tag" : "nidarosdomen",
		//	dummytag
		//	"tag" : "stedr-" + $model.get('id'),
		},
		success : function(){
			_.each(instagramCollection.models, function(element, index, list) {
			instagramItems.push({
				title : element.get('fullName'),
				image : element.get('url')
			});
		});
		Ti.API.info(JSON.stringify(instagramCollection));
			$.ig.createGrid({
			columns : 2, //NUMBER OF COLUMNS. DEFAULT IS 4.
			space : 10, //SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
			data : instagramItems, //ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE.
			layout : 'gallery', //LAYOUT TYPE: gallery or customView. DEFAULT IS gallery.
			params : {
				padding : 5, //GALLERY ONLY.
				showTitle : false, //GALLERY ONLY. True or False
				backgroundColor : '#FFFFFF',
				gridColor : '#40B0D2'
			},
			width : Titanium.Platform.DisplayCaps.platformWidth //OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
		});
		},
		
		error : function() {
			Ti.API.error("hmm - this is not good!");
	}
});

$.ig.on('click', function(e) {
	Ti.API.info("Clicked: " + e.source.id);
	
	var instagramViewController = Alloy.createController('instagramView', {
			"$model" : instagramCollection.get(e.source.id)
		});
		Ti.API.info(JSON.stringify(instagramCollection.get(e.source.id)));
		
		instagramViewController.getView().open();
		
});	

$.instagram.addEventListener('close', function() {
	Ti.API.info("Destroying story: " /* + $model.get('title')*/);
	$.destroy();
});

