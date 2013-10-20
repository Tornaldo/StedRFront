// var args = arguments[0] || {};

Ti.API.info("Hello");

// $.stedrWall.addEventListener('close', function() {
	// Ti.API.info("Destroying: " + Alloy.Models.wall.get('name'));
	// $.destroy();
// });

$.wallModel.set($model);

Ti.API.info("Entering: " + $.wallModel.get('title'));
