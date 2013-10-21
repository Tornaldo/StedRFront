function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "story";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("story");
    $.__views.story = Ti.UI.createWindow({
        title: "Stories",
        id: "story"
    });
    $.__views.story && $.addTopLevelView($.__views.story);
    $.__views.st = Alloy.createWidget("tiflexigrid", "widget", {
        id: "st",
        __parentSymbol: $.__views.story
    });
    $.__views.st.setParent($.__views.story);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var items = [];
    var storyCollection = Alloy.Collections.story;
    storyCollection.fetch({
        urlparams: {
            placeId: $model.get("id")
        },
        success: function() {
            _.each(storyCollection.models, function(element) {
                items.push({
                    title: element.get("title"),
                    image: element.get("pictures")[0]
                });
            });
            Ti.API.info(JSON.stringify(storyCollection));
            $.st.createGrid({
                columns: 2,
                space: 10,
                data: items,
                layout: "gallery",
                params: {
                    padding: 5,
                    showTitle: true,
                    backgroundColor: "#eee",
                    gridColor: "#ccc"
                },
                width: Titanium.Platform.DisplayCaps.platformWidth
            });
        },
        error: function() {
            Ti.API.error("hmm - this is not good!");
        }
    });
    $.story.addEventListener("close", function() {
        Ti.API.info("Destroying story: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;