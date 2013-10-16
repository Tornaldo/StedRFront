var args = arguments[0] || {};

$.wallModel = _.extend({}, $.wallModel, {
	transform : function() {
		return dataTransformation(this);
	}
});

$.wallModel.set(args.data || {});

function dataTransformation(_model) {
	Ti.API.info(_model.get('name'));
	return {
		name : _model.get('name')
	};
}

