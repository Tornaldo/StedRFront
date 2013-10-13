exports.definition = {
	config : {
		"columns"	: {
			"wallId" 		: "int",
			"name"	 		: "string",
			"description"	: "string",
			"latitude"		: "double",
			"longitude"		: "double",
		},
		"URL" 		: "http://stedr.herokuapp.com/allwalls.json",
		"adapter" 	: {
			"type"	: "restapi",
			"collection_name" : "wall",
			"idAttribute" : "wallId" 
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

