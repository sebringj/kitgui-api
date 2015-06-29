var express = require('express');
var router = express.Router();
var models = require('../../models');
var security = require('../../utils/security');
var patterns = require('../../utils/patterns');

router.get('/:id', function(req, res) {
	var id = req.params.id;
	var now = Date.now();
	models.content
	.findOne({
		$and: [
			{ id: id },
			{ draft: { $ne: true } },
			{ 'versions.dateFrom': { $lte: now } },
			{ 'versions.dateTo': { $gte: now } }
		]
	})
	.select({
		'versions.$': 1
	})
	.lean()
	.exec(function(err, doc) {
		if (err) {
			res
				.status(500)
				.json({ err: 'db error' });
			return;
		}
		if (!doc) {
			res
				.status(404)
				.json({ err: 'not found' });
			return;
		}
		res.json(doc.versions[0].json);
	});
});

router.post('/', function(req, res) {

	var signature = req.body.signature;
	var assembly = req.body.assembly;

	if(!signature || typeof assembly !== 'object') {
		res.json({
			err: {
				code: 'er-4',
				message: 'signature and/or assembly are undefined'
			}
		});
		return;
	}

	var check = security.signatureCheck({
		signature: signature,
		data: assembly,
		secret: secret
	});

	if (check.err) {
		res.json(check);
		return;
	}

	if (patterns.isoDate.test(assembly.dateFrom))
		dateFrom = new Date(assembly.dateFrom);

	if (patterns.isoDate.test(assembly.dateTo))
		dateTo = new Date(assembly.dateTo);

	models.content.findOneAndUpdate({
		id: id,
		make: make
	},
	{
		id: id,
		kind: kind,
		$push: {
			versions: {
				$each: [{
					json: json,
					dateFrom: dateFrom,
					dateTo: dateTo
				}],
				$position: 0
			}
		}
	},
	{
		upsert: true
	},
	function() {

	});
});


module.exports = router;
