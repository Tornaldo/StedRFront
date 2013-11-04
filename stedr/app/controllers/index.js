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

$.mapWin.open();

//Android Google Maps v2 module
var MapModule;

var mapview;

if (OS_MOBILEWEB) {
	mapview = Titanium.Map.createView({
		mapType : Titanium.Map.STANDARD_TYPE,
		animate : true,
		regionFit : true,
		userLocation : true,
		region : {
			latitude : 63.427255,
			longitude : 10.396545,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		},
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
	if (evt.clicksource == 'infoWindow' || evt.clicksource == 'leftPane' || evt.clicksource == 'title' || evt.clicksource == 'rightPane') {
		Ti.API.info("Trying to enter: " + wallCollection.get(evt.annotation.id).get('title'));
		var stedrWallController = Alloy.createController('stedrWall', {
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
			if (OS_MOBILEWEB) {
				var mapAnnotation = Titanium.Map.createAnnotation({
					title : element.get('title'),
					latitude : element.get('latitude'),
					longitude : element.get('longitude'),
					rightView : Ti.UI.createImageView({
						image : element.get('thumbnailUrl'),
					}),

					id : element.get('id'),
				});
			} else {
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