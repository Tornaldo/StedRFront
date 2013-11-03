Alloy.Collections.tweets.reset($model);

function transformFunction(model) {
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    Ti.API.info("TRANSFORM "+ transform.profile_image_url_https);
    transform.userName = transform.user.name;
    transform.profileImage = transform.profile_image_url_https;
    transform.text = transform.text;
    return transform;
}   