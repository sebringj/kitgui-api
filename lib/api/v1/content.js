var express = require('express');
var router = express.Router();
var models = require('../../models');

router.get('/:id', function(req, res) {
	var id = req.params.id;
	models.content.findOne({ id: id }, { versions: { $slice: 1 } }, function(err, doc) {
		if (err) {
			res
				.status(404)
				.json({ err: 'not found' });
			return;
		}
		if (!doc) {
			res
				.status(500)
				.json({ err: 'server error' });
			return;
		}
		res.json({
			content: doc
		});
	});
});

module.exports = router;
