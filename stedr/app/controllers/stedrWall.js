// var args = arguments[0] || {};

Ti.API.info("Hello");

Ti.API.info("Entering: " + $model.get('title'));



Ti.API.info("Starting picturegallery: " + $model.get('title'));
var pictureGalleryController = Alloy.createController('pictureGallery', {
	// data : $model,
	"$model" : $model
});
$.test1View.add(pictureGalleryController.getView()); 


Ti.API.info("Starting picturegallery: " + $model.get('title'));
var storyGalleryController = Alloy.createController('story', {
	// data : $model,
	"$model" : $model
});
$.test3View.add(storyGalleryController.getView()); 

$.stedrWall.addEventListener('close', function() {
	Ti.API.info("Destroying: " + $model.get('title'));
	$.destroy();
});

