var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	local: {
		email: String,
		hash: String,
		hashedPassword: String
	},
	providers: [
		{
			provider: String,
			id: String,
			displayName: String,
			name: {
				familyName: String,
				givenName: String,
				middleName: String
			},
			photos: [{ value: String }],
			emails: [{ value: String, type: String }],
			profile: mongoose.Schema.Types.Mixed,
			tokens: mongoose.Schema.Types.Mixed
		}
	]
});

/*
schema.pre('save', function(next) {
	this.modified = new Date();
	if (typeof this.draft !== 'undefined')
		this.draft = false;
	next();
});

schema.index({id: 1}, {unique: true});
*/
var model = mongoose.model('User', schema);

module.exports = model;
