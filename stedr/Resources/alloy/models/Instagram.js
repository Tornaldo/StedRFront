exports.definition = {
    config: {
        columns: {
            fullName: "string",
            url: "string",
            tags: "string",
            commentCount: "int",
            caption: "string",
            likesCount: "int"
        },
        URL: "http://stedr.herokuapp.com/images.json",
        adapter: {
            type: "restapi",
            collection_name: "instagram",
            idAttribute: "url"
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