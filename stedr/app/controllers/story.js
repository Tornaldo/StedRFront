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

var items = [];

var addStoryId = "Add story";

//Push the plus sign (the tile that tells where to add stories).
items.push({
	title : addStoryId,
	image : "/images/digitaltfortaltlogoplus.png"
});

var opts = {
	title : "DigitaltFortalt",
	message : "Visit www.digitaltfortalt.no to add stories. Press visit for a more detailed explanation",
	buttonNames: ["Ok", "Visit"],
	ok: 0,
};

var dialog = Ti.UI.createAlertDialog(opts);

dialog.addEventListener('click', function(e){
	if (e.index == 1){
      Ti.Platform.openURL("http://digitaltfortalt.no/things/creating-stories-for-stedr/H-DF/DF.5043?state_id=&query=floch&js=1&search_context=1&count=2&pos=0");
    }
});

//Fetch the stories associated with the wall
var storyCollection = Alloy.Collections.story;
storyCollection.fetch({
	urlparams : {
		"placeId" : $model.get('id'),
	},
	success : function() {
		_.each(storyCollection.models, function(element, index, list) {
			items.push({
				title : element.get('title'),
				image : element.get('pictures')[0]
			});
		});
		$.storyGrid.createGrid({
			columns : 2, //NUMBER OF COLUMNS. DEFAULT IS 4.
			space : 10, //SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
			data : items, //ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE.
			layout : 'gallery', //LAYOUT TYPE: gallery or customView. DEFAULT IS gallery.
			params : {
				padding : 5, //GALLERY ONLY.
				showTitle : true, //GALLERY ONLY. True or False
				backgroundColor : '#FFFFFF',
				gridColor : '#40B0D2'
			},
			width : Titanium.Platform.displayCaps.platformWidth //OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
		});
		Ti.API.info('finish creating story grid');
	},
	error : function() {
		Ti.API.error("Could not load stories");
	}
});

//When clicked, open the storyView
$.storyGrid.on('click', function(e) {
	Ti.API.info("Clicked: " + e.source.id);
	if (e.source.id == addStoryId) {
		dialog.show();
	} else {
		var storyViewController = Alloy.createController('storyView', {
			"$model" : storyCollection.get(e.source.id)
		});
		var win = storyViewController.getView();
		if (Alloy.Globals.OS == "iphone") {
			Alloy.Globals.Nav.openWindow(win);
		} else {
			win.open();
		}
	}
});

$.story.addEventListener('close', function() {
	Ti.API.info("Destroying story");
	items = null;
	opts = null;
	storyCollection.destroy();
	$.destroy();
});
