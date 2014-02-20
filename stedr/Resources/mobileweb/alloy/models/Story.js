exports.definition = {
    config: {
        columns: {
            title: "string",
            ingress: "string",
            fortelling: "string",
            pictures: "string",
            videos: "string",
            author: "string",
            institution: "string",
            tags: "string",
            language: "string",
            category: "string"
        },
        URL: "http://stedr.herokuapp.com/stories.json",
        adapter: {
            type: "restapi",
            collection_name: "story",
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

model = Alloy.M("story", exports.definition, []);

collection = Alloy.C("story", exports.definition, model);

exports.Model = model;

exports.Collection = collection;