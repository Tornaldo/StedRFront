var args = arguments[0] || {};

var data = $model;

Ti.API.info("Entering: " + data.get('name'));

var imageUrlList = data.get('pictures');

for(i = 0; i < imageUrlList.length; i++) {
	var wallImage = Ti.UI.createImageView({
		image : imageUrlList[i].url
	});
	$.imageScroller.addView(wallImage);
}

$.stedrWall.addEventListener('close', function() {
	Ti.API.info("Destroying: " + data.get('name'));
	$.destroy();
});