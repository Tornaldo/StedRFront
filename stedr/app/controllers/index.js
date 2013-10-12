$.index.open();


function transformFunction(model) {
	Ti.API.log(model);
	var transform = model.toJSON();
	transform.name = '[' + transform.name + ']';
	return transform;
};

function filterFunction(collection) {
	return collection;
}

//Need something like this: http://docs.appcelerator.com/titanium/latest/#!/api/Alloy.Collections-method-instance (Singleton instance)
var wall = Alloy.Collections.wall;
wall.fetch({
	success : function(){
		// Here we goes through all the models, so any custom logic should be done here
        _.each(wall.models, function(element, index, list){
            
        });
        Ti.API.log(wall);
    },
    error : function(){
        Ti.API.error("hmm - this is not good!");
    }
});


$.index.addEventListener('close', function() {
	$.destroy();
});

function startMap(){
	var map = Alloy.createController('map').getView();
	map.open();
}
