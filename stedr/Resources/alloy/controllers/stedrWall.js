function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "stedrWall";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
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
        top: 20,
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
    var __alloyId14 = [];
    $.__views.imageScroller = Ti.UI.createScrollableView({
        views: __alloyId14,
        id: "imageScroller",
        showPagingControl: "true"
    });
    $.__views.welcomeWall.add($.__views.imageScroller);
    $.__views.__alloyId13 = Ti.UI.createTab({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        window: $.__views.welcomeWall,
        title: "Bilder",
        id: "__alloyId13"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId13);
    $.__views.storyTab = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "storyTab",
        title: "Stories"
    });
    $.__views.storyLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 20,
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
    $.__views.__alloyId15 = Ti.UI.createTab({
        backgroundColor: "#9B8D8D",
        backgroundSelectedColor: "#40B0D2",
        window: $.__views.storyTab,
        title: "Historier",
        id: "__alloyId15"
    });
    $.__views.stedrWall.addTab($.__views.__alloyId15);
    $.__views.stedrWall && $.addTopLevelView($.__views.stedrWall);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var items = [ {
        title: "sample 1",
        image: "http://www.lorempixel.com/700/600/"
    }, {
        title: "sample 2",
        image: "http://www.lorempixel.com/900/1200/"
    }, {
        title: "sample 3",
        image: "http://www.lorempixel.com/400/300/"
    }, {
        title: "sample 4",
        image: "http://www.lorempixel.com/600/600/"
    }, {
        title: "sample 5",
        image: "http://www.lorempixel.com/400/310/"
    }, {
        title: "sample 6",
        image: "http://www.lorempixel.com/410/300/"
    }, {
        title: "sample 7",
        image: "http://www.lorempixel.com/500/300/"
    }, {
        title: "sample 8",
        image: "http://www.lorempixel.com/300/300/"
    }, {
        title: "sample 9",
        image: "http://www.lorempixel.com/450/320/"
    }, {
        title: "sample 10",
        image: "http://www.lorempixel.com/500/400/"
    }, {
        title: "sample 11",
        image: "http://www.lorempixel.com/700/600/"
    }, {
        title: "sample 12",
        image: "http://www.lorempixel.com/900/1200/"
    }, {
        title: "sample 13",
        image: "http://www.lorempixel.com/400/300/"
    }, {
        title: "sample 14",
        image: "http://www.lorempixel.com/600/600/"
    }, {
        title: "sample 15",
        image: "http://www.lorempixel.com/400/310/"
    }, {
        title: "sample 16",
        image: "http://www.lorempixel.com/410/300/"
    }, {
        title: "sample 17",
        image: "http://www.lorempixel.com/500/300/"
    }, {
        title: "sample 18",
        image: "http://www.lorempixel.com/300/300/"
    }, {
        title: "sample 19",
        image: "http://www.lorempixel.com/450/320/"
    }, {
        title: "sample 20",
        image: "http://www.lorempixel.com/500/400/"
    } ];
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
        width: 320
    });
    var data = $model;
    Ti.API.info("Entering: " + data.get("name"));
    var imageUrlList = data.get("pictures");
    for (i = 0; imageUrlList.length > i; i++) {
        var wallImage = Ti.UI.createImageView({
            image: imageUrlList[i].url
        });
        $.imageScroller.addView(wallImage);
    }
    $.stedrWall.addEventListener("close", function() {
        Ti.API.info("Destroying: " + data.get("name"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;