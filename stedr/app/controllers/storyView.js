Ti.API.info("Hello");
Ti.API.info("Entering: " + $model.get('title'));

$.storyTitle.setText($model.get('title'));

var mediaGalleryController = Alloy.createController('mediaGallery', {
	"$model" : $model
});
$.mediaGalleryStory.add(mediaGalleryController.getView());



$.storyView.addEventListener('close', function() {
	Ti.API.info("Destroying: " + $model.get('title'));
	$.destroy();
}); 