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

/*
 * Add media gallery for the images and videos from Digitalt Fortalt,
 * inn mediaGelleryView
 */
var mediaGalleryController = Alloy.createController('mediaGallery', {
	"$model" : $model
});
$.mediaGalleryView.add(mediaGalleryController.getView());

/*
 * Add twitter controller in twitterView
 */
var twitterController = Alloy.createController('twitter', {
	"$model" : $model
});
$.twitterView.add(twitterController.getView());

/*
 * Set the text labels
 */

$.storyTitle.setText($model.get('title'));
$.subTitle.setText($model.get('ingress'));
$.storyText.setText($model.get('fortelling'));
$.storyAuthor.setText("Author: "+ $model.get('author'));

/*
 * Make tags from Digitalt Fortalt,
 * add them in tagView
 */

var tags = $model.get('tags');

var tagStart = Ti.UI.createLabel({
	text : "Tags: ",
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE,
	left : 5,
	color : 'white',
	font : {
		fontFamily : 'Helvetica',
		fontSize : '15dp',
		fontStyle : 'normal',
		fontWeight : 'normal',
	}
});
$.tagView.add(tagStart);
for ( i = 0; i < tags.length; i++) {
	var tag = Ti.UI.createLabel({
		text : "- "+ tags[i],
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		left : 10,
		color : 'white',
		font : {
			fontFamily : 'Helvetica',
			fontSize : '15dp',
			fontStyle : 'normal',
			fontWeight : 'normal',
		}
	});
	$.tagView.add(tag);
}


/*
 * Listeners
 */

$.storyView.addEventListener('close', function() {
	Ti.API.info("Destroying storyview");
	mediaGalleryController = null;
	twitterController = null;
	$.destroy();
}); 