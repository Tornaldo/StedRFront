function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "story";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.story = Ti.UI.createView({
        id: "story"
    });
    $.__views.story && $.addTopLevelView($.__views.story);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var storyCollection = Alloy.Collections.story;
    storyCollection.fetch({
        urlparams: {
            wallId: 2
        },
        success: function() {
            _.each(storyCollection.models, function() {});
            Ti.API.info(storyCollection);
        },
        error: function() {
            Ti.API.error("hmm - this is not good!");
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;