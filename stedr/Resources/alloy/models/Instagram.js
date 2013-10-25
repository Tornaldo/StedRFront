exports.definition = {
    config: {
        columns: {
            username: "string",
            imageurl: "string"
        },
        URL: "http://stedr.herokuapp.com/instagram.json",
        adapter: {
            type: "restapi",
            collection_name: "instagram",
            idAttribute: "title"
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

model = Alloy.M("instagram", exports.definition, []);

collection = Alloy.C("instagram", exports.definition, model);

exports.Model = model;

exports.Collection = collection;