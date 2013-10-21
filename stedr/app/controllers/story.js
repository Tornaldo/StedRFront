var items = [];

var storyCollection = Alloy.Collections.story;
storyCollection.fetch({
	urlparams : {
		"placeId" : $model.get('id'),
	},
	success : function() {
		_.each(storyCollection.models, function(element, index, list) {
			items.push({
				title : element.get('title'),
				image : element.get('pictures')[0]
			});
		});
		Ti.API.info(JSON.stringify(storyCollection));
		$.st.createGrid({
			columns : 2, //NUMBER OF COLUMNS. DEFAULT IS 4.
			space : 10, //SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
			data : items, //ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE.
			layout : 'gallery', //LAYOUT TYPE: gallery or customView. DEFAULT IS gallery.
			params : {
				padding : 5, //GALLERY ONLY.
				showTitle : true, //GALLERY ONLY. True or False
				backgroundColor : '#eee',
				gridColor : '#ccc'
			},
			width : Titanium.Platform.DisplayCaps.platformWidth //OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
		});
	},
	error : function() {
		Ti.API.error("hmm - this is not good!");
	}
});

// $.story.addEventListener('click', function(evt) {
	// Ti.API.info(evt.type);
	// Ti.API.info(evt.clicksource);
// });

$.story.addEventListener('close', function() {
	Ti.API.info("Destroying story: " + $model.get('title'));
	$.destroy();
});

