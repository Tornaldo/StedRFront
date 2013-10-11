var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE, 
	animate: true,
	userLocation: true
});

$.mapWin.add(mapview);

function createAnnotations(){
	var home = Titanium.Map.createAnnotation({
		latitude: 63.432758,
		longitude: 10.352254,
		title:"Odds home",
		subtitle:"Ingrids home too",
		pincolor: Titanium.Map.ANNOTATION_GREEN
	});
	mapview.annotations = [home];
}