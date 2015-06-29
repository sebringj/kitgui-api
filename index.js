var express = require('express');
var app = express();
var config = require('config');
var port = config.port || 3000;
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', require('./lib/api/v1'));

var server = app.listen(config.port, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('KitGUI listening at %s:%s', host, port);
});
