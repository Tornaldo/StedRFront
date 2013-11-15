function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "story";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.story = Ti.UI.createWindow({
        id: "story"
    });
    $.__views.story && $.addTopLevelView($.__views.story);
    $.__views.__alloyId2 = Ti.UI.createView({
        id: "__alloyId2"
    });
    $.__views.story.add($.__views.__alloyId2);
    $.__views.storyGrid = Alloy.createWidget("tiflexigrid", "widget", {
        id: "storyGrid",
        __parentSymbol: $.__views.__alloyId2
    });
    $.__views.storyGrid.setParent($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var items = [];
    var addStoryId = "Add story";
    items.push({
        title: addStoryId,
        image: "/images/digitaltfortaltlogoplus.png"
    });
    var opts = {
        title: "DigitaltFortalt",
        message: "Visit www.digitaltfortalt.no to add stories",
        ok: "Ok"
    };
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
            Ti.API.info("finish creating story grid");
        },
        error: function() {
            Ti.API.error("Could not load stories");
        }
    });
    $.storyGrid.on("click", function(e) {
        Ti.API.info("Clicked: " + e.source.id);
        if (e.source.id == addStoryId) Ti.UI.createAlertDialog(opts).show(); else {
            var storyViewController = Alloy.createController("storyView", {
                $model: storyCollection.get(e.source.id)
            });
            var win = storyViewController.getView();
            "iphone" == Alloy.Globals.OS ? Alloy.Globals.Nav.openWindow(win) : win.open();
        }
    });
    $.story.addEventListener("close", function() {
        Ti.API.info("Destroying story");
        items = null;
        opts = null;
        storyCollection.destroy();
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;