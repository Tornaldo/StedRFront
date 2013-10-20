exports.definition = {
	config : {
		"columns" : {
			"id" : "int",
			"title" : "string",
			"latitude" : "double",
			"longitude" : "double",
			"dataAdded" : "int",
			"owner" : "string",
			"ownerName" : "string",
			"pictureUrl" : "string",
			"thumbnailUrl" : "string"
		},
		"URL" : "http://stedr.herokuapp.com/places.json",
		"adapter" : {
			"type" : "restapi",
			"collection_name" : "wall",
			"idAttribute" : "id"
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

