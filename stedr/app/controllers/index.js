$.index.open();

var wallList = new Array();

var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	animate : true,
	regionFit : true,
	userLocation : true,
});

$.mapWin.add(mapview);

mapview.addEventListener('click', function(evt) {
	if (evt.clicksource == 'leftButton') {
		var stedrWallController = Alloy.createController('stedrWall', {
			data : wallCollection.get(evt.annotation.id),
			"$model" : wallCollection.get(evt.annotation.id)
		});
		stedrWallController.getView().open();
	}
});

var anotationView = Titanium.UI.createView({
				borderRadius : 5,
				backgroundColor : 'red',
				width : 500,
				height : 500
			});

var pinColor = Titanium.Map.ANNOTATION_PURPLE;

var wallCollection = Alloy.Collections.wall;
wallCollection.fetch({
	success : function() {
		_.each(wallCollection.models, function(element, index, list) {
			var mapAnnotation = Titanium.Map.createAnnotation({
				title : element.get('name'),
				latitude : element.get('latitude'),
				longitude : element.get('longitude'),
				pincolor : pinColor,
				customView : anotationView,
				id : index
			});
			wallList.push(mapAnnotation);
		});
		mapview.annotations = wallList;
		Ti.API.log(wallCollection);
	},
	error : function() {
		Ti.API.error("hmm - this is not good!");
	}
});

$.index.addEventListener('close', function() {
	$.destroy();
}); 