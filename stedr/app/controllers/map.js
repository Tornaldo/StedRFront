var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	animate : true,
	userLocation : true,
});

$.mapWin.add(mapview);

function createAnnotations() {
	var wallList = [];
	for (var x in $.wall) {
		var mapAnnotation = Titanium.Map.createAnnotation({
			latitude : x.get('latitude'),
			longitude : x.get('longitude'),
			pincolor : Titanium.Map.ANNOTATION_GREEN
		});
		wallList.push[mapAnnotation];
	}
	var x = Titanium.Map.createAnnotation({
		latitude : 52.702187,
		longitude : 10.228271,
		title:"somewhere in Deutschland",
		pincolor : Titanium.Map.ANNOTATION_RED
	});
	wallList.push[x];
	mapview.annotations = wallList;
}