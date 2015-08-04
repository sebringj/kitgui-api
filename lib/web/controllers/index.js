var express = require('express');
var router = express.Router();
var react = require('../../utils/react');

react.init({
	router: router,
	initialView: 'index.jsx',
	app: 'lib/web/app.js'
});

router.use('/signIn', function(req, res) {
	var head = { title: 'KitGUI Sign Up' };
	var data = {
		component: 'SignIn',
		componentProps: {}
	};
	react.render({ head: head, data: data, req: req, res: res });
});

module.exports = router;
