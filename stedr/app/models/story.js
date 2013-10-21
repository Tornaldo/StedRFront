exports.definition = {
	config : {
		"columns" : {
			"title" : "string",
			"ingress":"string",
			"fortelling": "string",
			"pictures" : "string",
			"videos": "string",
			"author" : "string",
			"institution" : "string",
			"tags": "string",
			"language" : "string",
			"category" : "string",
		},
		"URL" : "http://stedr.herokuapp.com/stories.json",
		"adapter" : {
			"type" : "restapi",
			"collection_name" : "story",
			"idAttribute" : "title"
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

