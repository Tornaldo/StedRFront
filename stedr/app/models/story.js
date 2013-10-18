exports.definition = {
	config : {
		"columns" : {
			"storyId" : "int",
			"category" : "string",
			"title" : "string",
			"pictures" : "string"
		},
		"URL" : "http://stedr.herokuapp.com/stories.json",
		"adapter" : {
			"type" : "restapi",
			"collection_name" : "story",
			"idAttribute" : "storyId"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// If adding and editing walls shall be allowed, the specific url must be added here
		});
		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {});
		return Collection;
	}
};

