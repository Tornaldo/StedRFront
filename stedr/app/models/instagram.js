exports.definition = {
	config : {
		"columns" : {
			"username" : "string",
			"imageurl" : "string",
		},
		"URL" : "http://stedr.herokuapp.com/images.json",
		"adapter" : {
			"type" : "restapi",
			"collection_name" : "instagram",
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

