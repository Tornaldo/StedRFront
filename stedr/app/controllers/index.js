$.index.open();

//Android Google Maps v2 module
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
			latitude : 63.427255,
			longitude : 10.396545,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		},
	});
}

$.mapWin.add(mapview);

mapview.addEventListener('click', function(evt) {
	Ti.API.info(evt.type);
	Ti.API.info(evt.clicksource);
	if (evt.clicksource == 'infoWindow' || evt.clicksource == 'leftPane' || evt.clicksource == 'title') {
		Ti.API.info("Trying to enter: " + wallCollection.get(evt.annotation.id).get('title'));
		var stedrWallController = Alloy.createController('stedrWall', {
			data : wallCollection.get(evt.annotation.id),
			"$model" : wallCollection.get(evt.annotation.id)
		});
		stedrWallController.getView().open();
	}
});

var wallCollection = Alloy.Collections.wall;
wallCollection.fetch({
	success : function() {
		_.each(wallCollection.models, function(element, index, list) {
			Ti.API.info("Making annotation for " + element.get('title'));
			Ti.API.info(JSON.stringify(element));
			Ti.API.info(element.get('thumbnailUrl'));
			var mapAnnotation = MapModule.createAnnotation({
				title : element.get('title'),
				latitude : element.get('latitude'),
				longitude : element.get('longitude'),
				rightView : Ti.UI.createImageView({
					image : element.get('thumbnailUrl'),
				}),

				pincolor : MapModule.ANNOTATION_AZURE,
				leftView : Ti.UI.createButton({
					title : 'Besøk'
				}),
				id : element.get('id'),
			});
			mapview.addAnnotation(mapAnnotation);
		});
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