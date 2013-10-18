var args = arguments[0] || {};

var dataWallModel = $model;

Ti.API.info("Entering: " + dataWallModel.get('name'));

var imageUrlList = dataWallModel.get('pictures');

for ( i = 0; i < imageUrlList.length; i++) {
	var wallImage = Ti.UI.createImageView({
		image : imageUrlList[i].url
	});
	$.imageScroller.addView(wallImage);
}

var items = [];

var storyCollection = Alloy.Collections.story;
storyCollection.fetch({
	urlparams : {
		"wallId" : $model.get('wallId'),
	},
	success : function() {
		_.each(storyCollection.models, function(element, index, list) {
			items.push({
				title : element.get('title'),
				image : element.get('pictures')[0]
			});
		});
		Ti.API.info(storyCollection);
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

$.stedrWall.addEventListener('close', function() {
	Ti.API.info("Destroying: " + dataWallModel.get('name'));
	$.destroy();
});
