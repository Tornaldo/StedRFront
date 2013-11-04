Ti.API.info("Hello");
Ti.API.info("Entering: " /*+ $model.get('username')*/);

// $.userName.setText($model.get('username'));
// $.url.setText($model.get('imageurl'));

$.igv.createGrid({
			columns : 1, //NUMBER OF COLUMNS. DEFAULT IS 4.
			space : 10, //SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
			data : $model, //ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE.
			layout : 'gallery', //LAYOUT TYPE: gallery or customView. DEFAULT IS gallery.
			params : {
				padding : 5, //GALLERY ONLY.
				showTitle : true, //GALLERY ONLY. True or False
				backgroundColor : '#FFFFFF',
				gridColor : '#40B0D2'
			},
			width : Titanium.Platform.DisplayCaps.platformWidth //OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
		});

$.igView.addEventListener('close', function() {
	Ti.API.info("Destroying: "/* + $model.get('username')*/);
	$.destroy();
});
