var crypto = require('crypto');
var patterns = require('./patterns');

function signatureCheck(options) {
	// ISO-8601 and the format is: YYYY-MM-DDTHH:mm:ss.sssZ (date.toISOString())
	var expireDate;
	if (options.data.expires) {
		if (patterns.isoDate.test(options.data.expires))
			expireDate = new Date(options.data.expires);
		else
			return {
				err: {
					code: 'err-1',
					message: 'date not ISO format'
				}
			};
		if (expireDate.ticks <= Date.now())
			return {
				code: 'err-2',
				err: 'date expired'
			};
	}

	if (options.signature !== calculatedSignature)
		return {
			code: 'err-3',
			err: 'signature does not match'
		};

	var dataString = JSON.stringify(options.data);
	var calculatedSignature = crypto
		.createHmac('sha1', options.secret)
		.update(new Buffer(dataString, 'utf-8'))
		.digest('hex');

	return {};
}

module.exports = {
	signatureCheck: signatureCheck
};
