Alloy.Collections.tweets.reset($model);

function transformFunction(model) {
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    Ti.API.info("TRANSFORM picture"+ transform.user.profile_image_url_https);
    transform.userName = transform.user.name;
    transform.screenName = "@" + transform.user.screen_name;
    transform.created = transform.created_at.slice(0,16);
    transform.profileImage = transform.user.profile_image_url_https;
    transform.text = transform.text;
    return transform;
}   

function showTweet(evt){
	Ti.API.info(evt);
	Ti.API.info(evt.source);
	Ti.API.info(JSON.stringify(evt.source));
}

