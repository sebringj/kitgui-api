var express = require('express');
var router = express.Router();
var react = require('../../utils/react');

react.init({
	router: router,
	initialView: 'index.jsx',
	app: 'lib/web/app.js'
});

router.use('/signIn', function(req, res) {
	var data = {
		title: 'Sign In',
		route: 'signIn'
	};
	react.render(data, req, res);
});

module.exports = router;
