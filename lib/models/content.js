var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	id: String,
	kind: String,
	versions: [{
		json: mongoose.Schema.Types.Mixed,
		modified: Date,
		dateFrom: Date,
		dateTo: Date,
		draft: Boolean
	}],
	referrers: [String]
});

schema.pre('save', function(next) {
	this.modified = new Date();
	if (typeof this.draft !== 'undefined')
		this.draft = false;
	next();
});

schema.index({id: 1}, {unique: true});

var model = mongoose.model('Content', schema);

module.exports = model;
