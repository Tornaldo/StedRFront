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
	Ti.API.info(evt);
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

$.stedrWall.addEventListener('close', function() {
	Ti.API.info("Destroying: " + $model.get('title'));
	$.destroy();
});

