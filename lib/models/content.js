var mongoose = require('mongoose');

var model = mongoose.model('Content', {
	id: String,
	versions: [{
		text: String,
		created: Date,
		modified: Date
	}],
	paths: [String]
});

module.exports = model;
