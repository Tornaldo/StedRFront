$.index.open();

var wallList = new Array();

var MapModule;
var mapview;

if (OS_MOBILEWEB) {
	mapview = Titanium.Map.createView({
		mapType : Titanium.Map.STANDARD_TYPE,
		animate : true,
		regionFit : true,
		userLocation : true,
	});
} else {
	MapModule = require('ti.map');
	mapview = MapModule.createView({
		userLocation : true,
		mapType : MapModule.NORMAL_TYPE,
		animate : true,
		region : {
			latitude : -33.87365,
			longitude : 151.20689,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},

	});
}

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

var wallCollection = Alloy.Collections.wall;
wallCollection.fetch({
	success : function() {
		_.each(wallCollection.models, function(element, index, list) {
			Ti.API.info(element.get('name'));
			var mapAnnotation = Titanium.Map.createAnnotation({
				title : element.get('name'),
				latitude : element.get('latitude'),
				longitude : element.get('longitude'),
				pincolor : Titanium.Map.ANNOTATION_GREEN,
				id : index
			});
			wallList.push(mapAnnotation);
		});
		mapview.annotations = wallList;
		Ti.API.info(wallCollection);
	},
	error : function() {
		Ti.API.error("hmm - this is not good!");
	}
});

$.index.addEventListener('close', function() {
	$.destroy();
});

//
// // function checkGooglePlayService() {
// // var MapModule = require('ti.map');
// // var rc = MapModule.isGooglePlayServicesAvailable();
// // switch (rc) {
// // case MapModule.SUCCESS:
// // Ti.API.info('Google Play services is installed.');
// // break;
// // case MapModule.SERVICE_MISSING:
// // Ti.API.info('Google Play services is missing. Please install Google Play services from the Google Play store.');
// // break;
// // case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
// // Ti.API.info('Google Play services is out of date. Please update Google Play services.');
// // break;
// // case MapModule.SERVICE_DISABLED:
// // Ti.API.info('Google Play services is disabled. Please enable Google Play services.');
// // break;
// // case MapModule.SERVICE_INVALID:
// // Ti.API.info('Google Play services cannot be authenticated. Reinstall Google Play services.');
// // break;
// // default:
// // Ti.API.info('Unknown error.');
// // break;
// // }
// // }