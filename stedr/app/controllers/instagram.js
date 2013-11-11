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

var instagramItems = [];

var instagramCollection = Alloy.Collections.instagram;
instagramCollection.fetch({
	urlparams : {
		"tag" : $model.get('title'),
	},
	success : function() {
		_.each(instagramCollection.models, function(element, index, list) {
			instagramItems.push({
				title : element.get('fullName'),
				image : element.get('url')
			});
		});
		Ti.API.info(JSON.stringify(instagramCollection));
		$.instagramGrid.createGrid({
			columns : 2, //NUMBER OF COLUMNS. DEFAULT IS 4.
			space : 10, //SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
			data : instagramItems, //ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE.
			layout : 'gallery', //LAYOUT TYPE: gallery or customView. DEFAULT IS gallery.
			params : {
				padding : 5, //GALLERY ONLY.
				showTitle : false, //GALLERY ONLY. True or False
				backgroundColor : '#FFFFFF',
				gridColor : '#40B0D2'
			},
			width : Titanium.Platform.displayCaps.platformWidth //OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
		});
		Ti.API.info('finish creating instagram grid');
	},

	error : function() {
		Ti.API.error("Could not load instagram");
	}
});

$.instagramGrid.on('click', function(e) {
	Ti.API.info("click");
	Ti.API.info(e.source.strImage);
	Ti.API.info(JSON.stringify(instagramCollection));
	Ti.API.info(JSON.stringify(instagramCollection.get(e.source.strImage)));
	var instagramViewController = Alloy.createController('instagramView', {
		"$model" : instagramCollection.get(e.source.strImage)
	});
	instagramViewController.getView().open();
});

$.instagram.addEventListener('close', function() {
	Ti.API.info("Destroying story: " + $model.get('title'));
	$.destroy();
});

