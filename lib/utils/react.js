var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');

var Index;

function init(options) {
	jsx.install();

	Index =  require('../web/views/' + options.initialView);

	options.router.use('/bundle.js', function(req, res) {
	  res.setHeader('content-type', 'application/javascript');
	  browserify(options.app, {
	    debug: true
	  })
	  .transform('reactify')
	  .bundle()
	  .pipe(res);
	});
}

function render(data, res, res) {
	res.setHeader('Content-Type', 'text/html');
	var head = '<head><title></title></head>';
	var body = React.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.div({
        id: 'root',
        dangerouslySetInnerHTML: {
          __html: React.renderToString(React.createElement(Index, {
            data: data
          }))
        }
      }),
      React.DOM.script({
        'id': 'initial-data',
        'type': 'text/plain',
        'data-json': JSON.stringify(data)
      }),
      React.DOM.script({
        src: '/bundle.js'
      })
    )
  );
	res.end('<!DOCTYPE html>\r\n<html>'+ head + body +'</html>');
}

module.exports = {
	init: init,
	render: render
};
