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

var imageUrlList = $model.get('pictures');
var videoUrlList = $model.get('videos');

Ti.API.info("Media for: " + $model.get('title'));

if (imageUrlList) {
	for ( i = 0; i < imageUrlList.length; i++) {
		var wallImage = Ti.UI.createImageView({
			image : imageUrlList[i]
		});
		$.mediaScroller.addView(wallImage);
	}
}

var deviceHeight = Ti.Platform.displayCaps.platformHeight;

if (videoUrlList) {
	for ( i = 0; i < videoUrlList.length; i++) {
		var wallVideo1 = Ti.Media.createVideoPlayer({
			url : videoUrlList[i],
			mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
			// scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
			autoplay : true,
		});

		// var wallVideo2 = Titanium.Media.createVideoPlayer({
		// url : videoUrlList[i],
		// backgroundColor : 'blue',
		// movieControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
		// scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
		// autoplay : true,
		// });
		// var wallVideo3 = Ti.Media.createVideoPlayer({
		// url : videoUrlList[i],
		// backgroundColor : 'blue',
		// movieControlMode : Ti.Media.VIDEO_CONTROL_DEFAULT,
		// scalingMode : Titanium.Media.VIDEO_SCALING_MODE_FILL,
		// autoplay : true,
		// });
		// var wallVideo4 = Ti.Media.createVideoPlayer({
		// url : videoUrlList[i],
		// backgroundColor : 'blue',
		// mediaControlStyle : Ti.Media.VIDEO_CONTROL_EMBEDDED,
		// // scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
		// autoplay : true,
		// });
		// var wallVideo5 = Ti.Media.createVideoPlayer({
		// url : videoUrlList[i],
		// backgroundColor : 'blue',
		// movieControlStyle : Ti.Media.VIDEO_CONTROL_VOLUME_ONLY,
		// // scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
		// autoplay : true,
		// });
		// var wallVideo6 = Ti.Media.createVideoPlayer({
		// url : videoUrlList[i],
		// backgroundColor : 'blue',
		// movieControlMode : Ti.Media.VIDEO_CONTROL_VOLUME_ONLY,
		// // scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
		// autoplay : true,
		//
		// });

		$.mediaScroller.addView(wallVideo1);
		// $.mediaScroller.addView(wallVideo2);
		// $.mediaScroller.addView(wallVideo3);
		// $.mediaScroller.addView(wallVideo4);
		// $.mediaScroller.addView(wallVideo5);
		// $.mediaScroller.addView(wallVideo6);
	}
}

$.mediaScroller.addEventListener('close', function() {
	Ti.API.info("Destroying gallery: " + $model.get('title'));
	imageUrlList = null;
	videoUrlList = null;
	deviceHeight = null;
	$.destroy();
});