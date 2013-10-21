Ti.API.info("Hello");

Ti.API.info("Entering: " + $model.get('title'));


Ti.API.info("Starting picturegallery: " + $model.get('title'));
var pictureGalleryController = Alloy.createController('pictureGallery', {
	"$model" : $model
});
$.pictureGallery.add(pictureGalleryController.getView()); 


Ti.API.info("Starting storygallery: " + $model.get('title'));
var storyGalleryController = Alloy.createController('story', {
	"$model" : $model
});
$.storyOrPictureView.add(storyGalleryController.getView()); 

Ti.API.info("Starting instagramgallery: " + $model.get('title'));
var instagramController = Alloy.createController('instagramController', {
	"$model" : $model
});




$.stedrWall.addEventListener('close', function() {
	Ti.API.info("Destroying: " + $model.get('title'));
	$.destroy();
});

