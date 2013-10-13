var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	animate : true,
	userLocation : true,
});

$.mapWin.add(mapview);

mapview.addEventListener('click', function(evt) {
	Ti.API.info("Annotation " + evt.title);
	if (evt.clicksource == 'leftPane') {
		var wall = Alloy.createController('stedrWall').getView();
		wall.open();
	}
});

function createAnnotations() {
	var wallList = [];

	//Won't work
	// for (var x in $.wall) {
	// var mapAnnotation = Titanium.Map.createAnnotation({
	// latitude : x.get('latitude'),
	// longitude : x.get('longitude'),
	// pincolor : Titanium.Map.ANNOTATION_GREEN
	// });
	// wallList.push[mapAnnotation];
	// }

	var x = Titanium.Map.createAnnotation({
		latitude : 52.702187,
		longitude : 10.228271,
		title : "Somewhere in Deutschland",
		pincolor : Titanium.Map.ANNOTATION_RED,
		leftButton : "/images/buttonimage.jpg",
	});
	wallList.push[x];
	mapview.annotations = [x];
}