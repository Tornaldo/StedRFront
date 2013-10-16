exports.definition = {
    config: {
        columns: {
            wallId: "int",
            name: "string",
            description: "string",
            latitude: "double",
            longitude: "double"
        },
        URL: "http://stedr.herokuapp.com/walls.json",
        adapter: {
            type: "restapi",
            collection_name: "wall",
            idAttribute: "wallId"
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