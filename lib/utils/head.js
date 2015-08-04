var he = require('he');
var _ = require('lodash');

var shortTags = 'meta link'.split(' ');

function prep(head) {
	head.tags = head.tags || [];
	if (head.title)
		head.tags.push({ name: 'title', text: head.title });
	head.css && head.css.forEach(function(url) {
		head.tags.push({
			name: 'link',
			attributes: [
				{ name: 'rel', value: 'stylesheet' },
				{ name: 'href', value: url }
			]
		});
	});
}

function render(head) {
	prep(head);
	var str = '';
	head.tags && head.tags.forEach(function(tag) {
		var isShortTag = (_.indexOf(shortTags, tag.name) > -1);
		str += '<' + tag.name;
		tag.attributes && tag.attributes.forEach(function(attribute) {
			str += attribute.name + '="' + he.encode(attribute.value) + '"';
		});
		if (isShortTag)
			str += '/'
		str += '>';
		if (!isShortTag) {
			if (tag.text) {
				str += he.encode(tag.text);
			} else if (tag.html) {
				str += tag.html;
			}
			str += '</' + tag.name + '>';
		}
	});
	return str;
}

module.exports = {
	render: render
};
