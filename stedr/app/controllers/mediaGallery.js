var imageUrlList = $model.get('pictures');
var videoUrlList = $model.get('videos');

Ti.API.info("Media for: " + $model.get('title'));

for ( i = 0; i < imageUrlList.length; i++) {
	var wallImage = Ti.UI.createImageView({
		image : imageUrlList[i]
	});
	$.mediaScroller.addView(wallImage);
}

var deviceHeight = Ti.Platform.displayCaps.platformHeight;

for ( i = 0; i < videoUrlList.length; i++) {
	var wallVideo1 = Ti.Media.createVideoPlayer({
		url : videoUrlList[i],
		// backgroundColor : 'blue',
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

$.mediaScroller.addEventListener('close', function() {
	Ti.API.info("Destroying gallery: " + $model.get('title'));
	$.destroy();
});
