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
		text : tags[i],
		color : 'white',
		backgroundColor : '#40B0D2',
		borderColor : '#8D8D8D',
		borderRadius : 4,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		left : 10,
		font : {
			fontFamily : 'Helvetica',
			fontSize : '15dp',
			fontStyle : 'normal',
			fontWeight : 'normal',
		}
	});
	$.tagView.add(tag);
}

$.storyView.addEventListener('close', function() {
	Ti.API.info("Destroying: " + $model.get('title'));
	$.destroy();
});
