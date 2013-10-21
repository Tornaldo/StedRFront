var imageUrlList = $model.get('pictureUrl');

Ti.API.info("Pictures for: " + $model.get('title'));

// If there is more than one picture (List)
// for ( i = 0; i < imageUrlList.length; i++) {
// var wallImage = Ti.UI.createImageView({
// image : imageUrlList[i].url
// });
// $.imageScroller.addView(wallImage);
// }

var wallImage = Ti.UI.createImageView({
	image : imageUrlList
});
$.imageScroller.addView(wallImage); 


$.imageScroller.addEventListener('close', function() {
	Ti.API.info("Destroying gallery: " + $model.get('title'));
	$.destroy();
});