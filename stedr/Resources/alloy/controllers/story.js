function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "story";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.story = Ti.UI.createView({
        id: "story"
    });
    $.__views.story && $.addTopLevelView($.__views.story);
    $.__views.storyGrid = Alloy.createWidget("tiflexigrid", "widget", {
        id: "storyGrid",
        __parentSymbol: $.__views.story
    });
    $.__views.storyGrid.setParent($.__views.story);
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
            Ti.API.info(Titanium.Platform.displayCaps.platformWidth);
            $.storyGrid.createGrid({
                columns: 2,
                space: 10,
                data: items,
                layout: "gallery",
                params: {
                    padding: 5,
                    showTitle: true,
                    backgroundColor: "#FFFFFF",
                    gridColor: "#40B0D2"
                },
                width: Titanium.Platform.displayCaps.platformWidth
            });
            Ti.API.info("finish creating grid");
            Ti.API.info($.story.getWidth() + " " + $.story.getHeight());
        },
        error: function() {
            Ti.API.error("Could not load story");
        }
    });
    $.storyGrid.on("click", function(e) {
        Ti.API.info("Clicked: " + e.source.id);
        var storyViewController = Alloy.createController("storyView", {
            $model: storyCollection.get(e.source.id)
        });
        storyViewController.getView().open();
    });
    $.story.addEventListener("close", function() {
        Ti.API.info("Destroying story: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;