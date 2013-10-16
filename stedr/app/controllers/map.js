var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	animate : true,
	regionFit: true,
	userLocation : false,
});

$.mapWin.add(mapview);

var globalWall;

mapview.addEventListener('click', function(evt) {
	if (evt.clicksource == 'leftButton') {
		var stedrWallController = Alloy.createController('stedrWall', {
			data : wallCollection.get(evt.annotation.id)
		});		
		var wall = Alloy.createController('stedrWall').getView();
		wall.open();
	}
});

var wallID;
var wallCollection = Alloy.Collections.wall;

function createAnnotations() {
	var wallList = new Array();
	wallCollection.fetch({
		success : function() {
			// Here we goes through all the models, so any custom logic should be done here
			_.each(wallCollection.models, function(element, index, list) {
				var mapAnnotation = Titanium.Map.createAnnotation({
					title : element.get('name'),
					latitude : element.get('latitude'),
					longitude : element.get('longitude'),
					pincolor : Titanium.Map.ANNOTATION_GREEN,
					leftButton : "/images/buttonimage.jpg",
					id : index
				});
				wallList.push(mapAnnotation);
			});
			mapview.annotations = wallList;
		},
		error : function() {
			Ti.API.error("hmm - this is not good!");
		}
	});
}