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

$.stedrWallWindow.setTitle($model.get('title'));

$.mediaScrollerMainImage.addView(Ti.UI.createImageView({
	image : $model.get('pictureUrl')
}));

$.creditLabel.setText("FOTO: " + $model.get('ownerName'));

Ti.API.info("Starting storygallery: " + $model.get('title'));
var storyGalleryController = Alloy.createController('story', {
	"$model" : $model
});

Ti.API.info("Starting instagramgallery: " + $model.get('title'));
var instagramController = Alloy.createController('instagram', {
	"$model" : $model,
});

$.storyOrPictureView.add(instagramController.getView());
$.storyOrPictureView.add(storyGalleryController.getView());

$.storyTab.addEventListener('click', function() {
	changeView(1);
});
$.pictureTab.addEventListener('click', function() {
	changeView(2);
});

function changeView(evt) {
	Ti.API.info("Change view");
	if (evt == 1) {
		$.storyTab.setBackgroundColor('#40B0D2');
		storyGalleryController.getView().show();
		instagramController.getView().hide();
		$.pictureTab.setBackgroundColor('#8D8D8D');
	} else if (evt == 2) {
		$.pictureTab.setBackgroundColor('#40B0D2');
		instagramController.getView().show();
		storyGalleryController.getView().hide();
		$.storyTab.setBackgroundColor('#8D8D8D');
	}
}

$.stedrWallWindow.addEventListener('close', function() {
	Ti.API.info("Destroying stedrwall");
	storyGalleryController = null;
	instagramController = null;
	stedrWallWindow = null;
	$.destroy();
}); 