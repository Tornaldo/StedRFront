function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "story";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("story");
    $.__views.storyTab = Ti.UI.createWindow({
        id: "storyTab",
        title: "Stories"
    });
    $.__views.storyTab && $.addTopLevelView($.__views.storyTab);
    $.__views.storyLabel = Ti.UI.createLabel({
        id: "storyLabel"
    });
    $.__views.storyTab.add($.__views.storyLabel);
    $.__views.st = Alloy.createWidget("tiflexigrid", "widget", {
        id: "st",
        __parentSymbol: $.__views.storyTab
    });
    $.__views.st.setParent($.__views.storyTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var items = [];
    var storyCollection = Alloy.Collections.story;
    storyCollection.fetch({
        urlparams: {
            wallId: $model.get("wallId")
        },
        success: function() {
            _.each(storyCollection.models, function(element) {
                items.push({
                    title: element.get("title"),
                    image: element.get("pictures")[0]
                });
            });
            Ti.API.info(storyCollection);
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;