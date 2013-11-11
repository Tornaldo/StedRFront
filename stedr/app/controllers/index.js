/**
 *	Copyright (c) 2013, Odd Fredrik Rogstad, Christian Frøystad, Simon Stastny, Knut Nergård
 *	All rights reserved.
 *
 *	Redistribution and use in source and binary forms, with or without
 *	modification, are permitted provided that the following conditions are met:
 *	* Redistributions of source code must retain the above copyright
 *	  notice, this list of conditions and the following disclaimer.
 *	* Redistributions in binary form must reproduce the above copyright
 *	  notice, this list of conditions and the following disclaimer in the
 *	  documentation and/or other materials provided with the distribution.
 *	* Neither the name of the project nor the
 *	  names of its contributors may be used to endorse or promote products
 *	  derived from this software without specific prior written permission.
 *
 *	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *	ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *	DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS BE LIABLE FOR ANY
 *	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *	ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

if (Alloy.Globals.OS == "iphone") {
	$.nav.open();
} else {
	Ti.API.info('starter ikke iphone');
	$.mapWin.open();
}

//Android Google Maps v2 module
var MapModule;

//The view to put the map
var mapview;

/*
 * If Android, require the ti.map module, if not,
 * use the Titanium Map
 */
if (Alloy.Globals.OS == "android") {
	MapModule = require('ti.map');
	mapview = MapModule.createView({
		userLocation : true,
		animate : true,
		mapType : MapModule.NORMAL_TYPE,
	});
} else {
	mapview = Titanium.Map.createView({
		mapType : Titanium.Map.STANDARD_TYPE,
		animate : true,
		userLocation : true,
		region : {
			latitude : 63.427255,
			longitude : 10.396545,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		},
	});
}

Ti.API.info('START MAP');
$.mapView.add(mapview);
Ti.API.info('Add eventlisteners');
mapview.addEventListener('click', function(evt) {
	Ti.API.info(evt.type);
	Ti.API.info(evt.clicksource);
	if (evt.clicksource == 'infoWindow' || evt.clicksource == 'leftPane' || evt.clicksource == 'title' || evt.clicksource == 'rightPane') {
		Ti.API.info("Trying to enter: " + wallCollection.get(evt.annotation.id).get('title'));
		var stedrWallController = Alloy.createController('stedrWall', {
			"$model" : wallCollection.get(evt.annotation.id)
		});
		var win = stedrWallController.getView();
		if (Alloy.Globals.OS == "iphone") {
			$.nav.openWindow(win);
		} else {
			win.open();
		}

	}
});

$.mapSearchButton.addEventListener('click', function(evt) {
	var searchText = $.searchField.getValue();
	if (OS_MOBILEWEB) {
		var geocoder = new google.maps.Geocoder();
		if (geocoder) {
			geocoder.geocode({
				'address' : searchText
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					mapview.setLocation({
						latitude : results[0].geometry.location.lat(),
						longitude : results[0].geometry.location.lng(),
						latitudeDelta : 0.1,
						longitudeDelta : 0.1
					});
				} else {
					Ti.API.error(status);
					Ti.API.info(JSON.stringify(results));
				}
			});
		} else {
			alert('Google Maps Geocoder not supported');
		}
	} else {
		Ti.API.info("PHONE");
		var xhr = Titanium.Network.createHTTPClient();
		var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + searchText + "&sensor=true&key=AIzaSyD7QIWz-xIs3WTWYR_0eaH_whi56NNE1sE";
		xhr.open('GET', url);
		xhr.onload = function() {
			var json = JSON.parse(this.responseText);
			switch(json.status) {
				case "OK":
					Ti.API.info(JSON.stringify(json));
					mapview.setLocation({
						latitude : json.results[0].geometry.location.lat,
						longitude : json.results[0].geometry.location.lng,
						latitudeDelta : 0.1,
						longitudeDelta : 0.1
					});
					break;
				case "ZERO_RESULTS":
					alert("No result for your search");
					break;
				case "OVER_QUERY_LIMIT":
					alert("Sorry, the query limit is exceeded");
					break;
				case "REQUEST_DENIED":
					alert("Sorry, your request was denied");
					break;
				case "INVALID_REQUEST":
					alert("Sorry, your request is invalid");
					break;
				default:
					alert("This is very strange! Do you have internet connection?");
					break;
			}
		};
		xhr.onerror = function(e) {
			alert("This is very strange! Do you have internet connection?");
			Ti.API.error(e.error);
		};
		xhr.send();
	}
});

var wallCollection = Alloy.Collections.wall;
wallCollection.fetch({
	success : function() {
		_.each(wallCollection.models, function(element, index, list) {
			Ti.API.info("Making annotation for " + element.get('title'));
			if (Alloy.Globals.OS == "android") {
				var mapAnnotation = MapModule.createAnnotation({
					title : element.get('title'),
					latitude : element.get('latitude'),
					longitude : element.get('longitude'),
					rightView : Ti.UI.createImageView({
						image : element.get('thumbnailUrl'),
					}),

					pincolor : MapModule.ANNOTATION_AZURE,
					id : element.get('id'),
				});
			} else {
				var mapAnnotation = Titanium.Map.createAnnotation({
					title : element.get('title'),
					latitude : element.get('latitude'),
					longitude : element.get('longitude'),
					rightView : Ti.UI.createImageView({
						image : element.get('thumbnailUrl'),
					}),

					id : element.get('id'),
				});
			}
			mapview.addAnnotation(mapAnnotation);
		});
	},
	error : function() {
		Ti.API.error("woops");
	}
});

$.mapWin.addEventListener('close', function() {
	$.destroy();
});
