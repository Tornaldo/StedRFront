var imageUrlList = $model.get('pictures');

Ti.API.info("Pictures for: " + $model.get('title'));

for ( i = 0; i < imageUrlList.length; i++) {
	var wallImage = Ti.UI.createImageView({
		image : imageUrlList[i].url
	});
	$.imageScroller.addView(wallImage);
}

$.imageScroller.addEventListener('close', function() {
	Ti.API.info("Destroying gallery: " + $model.get('title'));
	$.destroy();
});
