var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	id: String,
	name: String,
	key: String,
	secret: String,
	modified: Date
});

schema.pre('save', function(next) {
	this.modified = new Date();
	next();
});

schema.index({id: 1}, {unique: true});

var model = mongoose.model('Content', schema);

module.exports = model;
