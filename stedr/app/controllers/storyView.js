Ti.API.info("Hello");
Ti.API.info("Entering: " + $model.get('title'));

$.storyView.addEventListener('close', function() {
	Ti.API.info("Destroying: " + $model.get('title'));
	$.destroy();
});