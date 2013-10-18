function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "stedrWall";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("story");
    $.__views.stedrWall = Ti.UI.createTabGroup({
        id: "stedrWall"
    });
    $.__views.welcomeWall = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "welcomeWall"
    });
    $.__views.wallTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        color: "#000",
        font: {
            fontFamily: "Helvetica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "wallTitle",
        text: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.welcomeWall.add($.__views.wallTitle);
    var __alloyId16 = [];
    $.__views.imageScroller = Ti.UI.createScrollableView({
        views: __alloyId16,
        id: "imageScroller",
        showPagingControl: "true"
    });
    $.__views.welcomeWall.add($.__views.imageScroller);
    $.__views.__alloyId15 = Ti.UI.createTab({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        window: $.__views.welcomeWall,
        title: "Bilder",
        id: "__alloyId15"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId15);
    $.__views.storyTab = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "storyTab",
        title: "Stories"
    });
    $.__views.storyLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        color: "#000",
        font: {
            fontFamily: "Helvetica",
            fontSize: "30dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "storyLabel"
    });
    $.__views.storyTab.add($.__views.storyLabel);
    $.__views.st = Alloy.createWidget("tiflexigrid", "widget", {
        id: "st",
        __parentSymbol: $.__views.storyTab
    });
    $.__views.st.setParent($.__views.storyTab);
    $.__views.__alloyId17 = Ti.UI.createTab({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        window: $.__views.storyTab,
        title: "Historier",
        id: "__alloyId17"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId17);
    $.__views.stedrWall && $.addTopLevelView($.__views.stedrWall);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var dataWallModel = $model;
    Ti.API.info("Entering: " + dataWallModel.get("name"));
    var imageUrlList = dataWallModel.get("pictures");
    for (i = 0; imageUrlList.length > i; i++) {
        var wallImage = Ti.UI.createImageView({
            image: imageUrlList[i].url
        });
        $.imageScroller.addView(wallImage);
    }
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
    $.stedrWall.addEventListener("close", function() {
        Ti.API.info("Destroying: " + dataWallModel.get("name"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;