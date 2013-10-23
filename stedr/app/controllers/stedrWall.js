Ti.API.info("Hello");
Ti.API.info("Entering: " + $model.get('title'));

// var wallImageView = Titanium.UI.createImageView({
// image : $model.get('pictureUrl'),
// width : Ti.UI.FILL,
// });

$.mediaScrollerMainImage.addView(Ti.UI.createImageView({image : $model.get('pictureUrl')}));

// $.wallImageView.setImage($model.get('pictureUrl'));

// $.wallImageView.setImage($model.get('pictureUrl'));
// $.wallImageView.setWidth(Titanium.Platform.DisplayCaps.platformWidth);
// Ti.API.info("Width: " + $.wallImageView.getWidth());
// Ti.API.info("Width: " + $.wallImageView.getRect());
// Ti.API.info("Height: "+$.wallImageView.getHeight());
// Ti.API.info("HeightPic: "+$.wallImageView.getImage().getHeight());
// Ti.API.info("WidthPic: "+$.wallImageView.getImage().getWidth());

// var pictureGalleryController = Alloy.createController('pictureGallery', {
// "$model" : $model
// });
// $.pictureGallery.add(pictureGalleryController.getView());

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
	Ti.API.info("Change view");
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

