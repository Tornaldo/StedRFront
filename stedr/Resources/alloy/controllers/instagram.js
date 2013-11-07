function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "instagram";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.instagram = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Pictures",
        id: "instagram"
    });
    $.__views.instagram && $.addTopLevelView($.__views.instagram);
    $.__views.ig = Alloy.createWidget("tiflexigrid", "widget", {
        id: "ig",
        __parentSymbol: $.__views.instagram
    });
    $.__views.ig.setParent($.__views.instagram);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var instagramItems = [];
    var instagramCollection = Alloy.Collections.instagram;
    instagramCollection.fetch({
        urlparams: {
            tag: "nidarosdomen"
        },
        success: function() {
            _.each(instagramCollection.models, function(element) {
                instagramItems.push({
                    title: element.get("fullName"),
                    image: element.get("url")
                });
            });
            Ti.API.info(JSON.stringify(instagramCollection));
            $.ig.createGrid({
                columns: 2,
                space: 10,
                data: instagramItems,
                layout: "gallery",
                params: {
                    padding: 5,
                    showTitle: false,
                    backgroundColor: "#FFFFFF",
                    gridColor: "#40B0D2"
                },
                width: Titanium.Platform.displayCaps.platformWidth
            });
        },
        error: function() {
            Ti.API.error("hmm - this is not good!");
        }
    });
    $.ig.on("click", function(e) {
        Ti.API.info("Clicked: " + e.source.id);
        var instagramViewController = Alloy.createController("instagramView", {
            $model: instagramCollection.get(e.source.id)
        });
        Ti.API.info(JSON.stringify(instagramCollection.get(e.source.id)));
        instagramViewController.getView().open();
    });
    $.instagram.addEventListener("close", function() {
        Ti.API.info("Destroying story: ");
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;