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
    var addImageId = "Add image";
    instagramItems.push({
        title: addImageId,
        image: "/images/addimage.png"
    });
    var tag = $model.get("title");
    tag = tag.replace(/[^a-å0-9\s]/gi, "");
    tag = tag.replace(/[^a-å0-9]/gi, "_");
    var opts = {
        title: "Instagram",
        message: "Use Instagram to add images. Simply add the title of the place as a hashtag, eg. #" + tag,
        ok: "Ok"
    };
    var instagramCollection = Alloy.Collections.instagram;
    instagramCollection.fetch({
        urlparams: {
            tag: tag
        },
        success: function() {
            _.each(instagramCollection.models, function(element) {
                instagramItems.push({
                    title: element.get("fullName"),
                    image: element.get("url")
                });
            });
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
        if (e.source.id == addImageId) Ti.UI.createAlertDialog(opts).show(); else {
            var instagramViewController = Alloy.createController("instagramView", {
                $model: instagramCollection.get(e.source.strImage)
            });
            instagramViewController.getView().open();
        }
    });
    $.instagram.addEventListener("close", function() {
        Ti.API.info("Destroying instagram");
        instagramItems = null;
        addImageId = null;
        tag = null;
        opts = null;
        instagramCollection.destroy();
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;