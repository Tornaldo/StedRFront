var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	animate : true,
	userLocation : false,
});

$.mapWin.add(mapview);

var wallTitle = null;

mapview.addEventListener('click', function(evt) {
	Ti.API.info("Annotation " + evt.title);
	if (evt.clicksource == 'leftButton') {
		var wall = Alloy.createController('stedrWall').getView();
		wall.open();
	}
});

function createAnnotations() {
	var wallList = new Array();
	var walls = Alloy.Collections.wall;
	walls.fetch({
		success : function() {
			// Here we goes through all the models, so any custom logic should be done here
			_.each(walls.models, function(element, index, list) {
				Ti.API.info(element.get('latitude'));
				var mapAnnotation = Titanium.Map.createAnnotation({
					title : element.get('name'),
					latitude : element.get('latitude'),
					longitude : element.get('longitude'),
					pincolor : Titanium.Map.ANNOTATION_GREEN,
					leftButton : "/images/buttonimage.jpg"
				});
				Ti.API.info(mapAnnotation);
				wallList.push(mapAnnotation);
			});
			mapview.annotations = wallList;
		},
		error : function() {
			Ti.API.error("hmm - this is not good!");
		}
	});
}