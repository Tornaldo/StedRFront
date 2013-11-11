function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "instagram";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.instagram = Ti.UI.createView({
        backgroundColor: "white",
        title: "Pictures",
        id: "instagram"
    });
    $.__views.instagram && $.addTopLevelView($.__views.instagram);
    $.__views.instagramGrid = Alloy.createWidget("tiflexigrid", "widget", {
        id: "instagramGrid",
        __parentSymbol: $.__views.instagram
    });
    $.__views.instagramGrid.setParent($.__views.instagram);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var instagramItems = [];
    var instagramCollection = Alloy.Collections.instagram;
    instagramCollection.fetch({
        urlparams: {
            tag: $model.get("title")
        },
        success: function() {
            _.each(instagramCollection.models, function(element) {
                instagramItems.push({
                    title: element.get("fullName"),
                    image: element.get("url")
                });
            });
            Ti.API.info(JSON.stringify(instagramCollection));
            $.instagramGrid.createGrid({
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
            Ti.API.info("finish creating instagram grid");
        },
        error: function() {
            Ti.API.error("Could not load instagram");
        }
    });
    $.instagramGrid.on("click", function(e) {
        Ti.API.info("click");
        Ti.API.info(e.source.strImage);
        Ti.API.info(JSON.stringify(instagramCollection));
        Ti.API.info(JSON.stringify(instagramCollection.get(e.source.strImage)));
        var instagramViewController = Alloy.createController("instagramView", {
            $model: instagramCollection.get(e.source.strImage)
        });
        instagramViewController.getView().open();
    });
    $.instagram.addEventListener("close", function() {
        Ti.API.info("Destroying story: " + $model.get("title"));
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;