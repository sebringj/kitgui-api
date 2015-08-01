var express = require('express');
var app = express();
var config = require('config');
var port = config.port || 3000;
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use('/api/v1', cors(), require('./lib/api/v1'));
app.use('/', require('./lib/web/controllers'));

var server = app.listen(config.port, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('KitGUI API listening at %s:%s', host, port);
});
