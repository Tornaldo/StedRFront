var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	animate : true,
	userLocation : false,
});

$.mapWin.add(mapview);

var wallTitle = null;

mapview.addEventListener('click', function(evt) {
	Ti.API.info("Annotation " + evt.title);
	if (evt.clicksource == 'leftPane') {
		var wall = Alloy.createController('stedrWall').getView();
		wall.open();
	}
});

function createAnnotations() {
	var wallList = new Array();
	// var q = Alloy.Collections.wall;
	// q.fetch();
	// Ti.API.info(q);
	// for (var i in q) {
		// var mapAnnotation = Titanium.Map.createAnnotation({
			// latitude : i.latitude,
			// longitude : i.longitude,
			// pincolor : Titanium.Map.ANNOTATION_GREEN
		// });
		// Ti.API.info(mapAnnotation);
		// Ti.API.info(i.name);
		// wallList.push(mapAnnotation);
	// }

	var x = Titanium.Map.createAnnotation({
		latitude : 52.702187,
		longitude : 10.228271,
		title : "Somewhere in Deutschland",
		pincolor : Titanium.Map.ANNOTATION_RED,
		leftButton : "/images/buttonimage.jpg",
	});
	var y = Titanium.Map.createAnnotation({
		latitude : 63.428283,
		longitude : 10.395041,
		title : "Trondheim",
		pincolor : Titanium.Map.ANNOTATION_RED,
		leftButton : "/images/buttonimage.jpg",
		
	});
	wallList.push(x);
	wallList.push(y);
	Ti.API.info(wallList.length);
	for (var i in wallList) {
		Ti.API.info(i.title);
	}
	mapview.annotations = wallList;
}