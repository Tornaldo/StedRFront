/*
 * Add media gallery for the images and videos from Digitalt Fortalt,
 * inn mediaGelleryView
 */
var mediaGalleryController = Alloy.createController('mediaGallery', {
	"$model" : $model
});
$.mediaGalleryView.add(mediaGalleryController.getView());

/*
 * Add twitter controller in twitterView
 */
var twitterController = Alloy.createController('twitter', {
	"$model" : $model
});
$.twitterView.add(twitterController.getView());

/*
 * Set the text labels
 */

$.storyTitle.setText($model.get('title'));
$.subTitle.setText($model.get('ingress'));
$.storyText.setText($model.get('fortelling'));
$.storyAuthor.setText($model.get('author'));

/*
 * Make tags from Digitalt Fortalt,
 * add them in tagView
 */

var tags = $model.get('tags');

var tagStart = Ti.UI.createLabel({
	text : "Tags: ",
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE,
	left : 5,
	font : {
		fontFamily : 'Helvetica',
		fontSize : '15dp',
		fontStyle : 'normal',
		fontWeight : 'normal',
	}
});
$.tagView.add(tagStart);
for ( i = 0; i < tags.length; i++) {
	if (tags.length != i) {
		var tag = Ti.UI.createLabel({
			text : tags[i] + ", ",
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
	} else {
		var tag = Ti.UI.createLabel({
			text : tags[i],
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
	}
	$.tagView.add(tag);
}

/*
 * Close listener
 */

$.storyView.addEventListener('close', function() {
	Ti.API.info("Destroying: " + $model.get('title'));
	$.destroy();
});