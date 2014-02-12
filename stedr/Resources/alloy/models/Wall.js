exports.definition = {
    config: {
        columns: {
            id: "int",
            title: "string",
            latitude: "double",
            longitude: "double",
            dataAdded: "int",
            owner: "string",
            ownerName: "string",
            pictureUrl: "string",
            thumbnailUrl: "string"
        },
        URL: "http://stedr.herokuapp.com/places.json",
        adapter: {
            type: "restapi",
            collection_name: "wall",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("wall", exports.definition, []);

collection = Alloy.C("wall", exports.definition, model);

exports.Model = model;

exports.Collection = collection;