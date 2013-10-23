var imageUrlList = $model.get('pictures');
var videoUrlList = $model.get('videos');

Ti.API.info("Media for: " + $model.get('title'));
Ti.API.info(JSON.stringify($model.get('pictures')));

for ( i = 0; i < imageUrlList.length; i++) {
	var wallImage = Ti.UI.createImageView({
		image : imageUrlList[i]
	});
	$.mediaScroller.addView(wallImage);
}

for ( i = 0; i < videoUrlList.length; i++) {
	var wallImage = Titanium.Media.createVideoPlayer({
		url : videoUrlList[i],
		backgroundColor : 'blue',
		// mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		movieControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		// movieControlMode : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		// scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
		autoplay : true,
	});
	$.mediaScroller.addView(wallImage);
}

$.mediaScroller.addEventListener('close', function() {
	Ti.API.info("Destroying gallery: " + $model.get('title'));
	$.destroy();
});
