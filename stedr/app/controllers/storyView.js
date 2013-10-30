Ti.API.info("Hello");
Ti.API.info("Entering: " + $model.get('title'));

var mediaGalleryController = Alloy.createController('mediaGallery', {
	"$model" : $model
});
$.mediaGalleryStory.add(mediaGalleryController.getView());

$.storyTitle.setText($model.get('title'));
$.subTitle.setText($model.get('ingress'));
$.storyText.setText($model.get('fortelling'));
$.storyAuthor.setText($model.get('author'));

var tags = $model.get('tags');

for ( i = 0; i < tags.length; i++) {
	var tag = Ti.UI.createLabel({
		text : tags[i]
	});
	$.tagView.add(tag);
}

$.storyView.addEventListener('close', function() {
	Ti.API.info("Destroying: " + $model.get('title'));
	$.destroy();
}); 