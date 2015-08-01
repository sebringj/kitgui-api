var config = require('config');
var mongoose = require('mongoose');

mongoose.connect(config.mongo);

var db = mongoose.connection;
db.on('error', function() {
	console.log('mongodb connection error');
});
db.once('open', function() {
	console.log('mongodb connection successful');
});

module.exports = {
	content: require('./content'),
	user: require('./user')
};
