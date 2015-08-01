var React = require('react');
var Index = require('./views/index.jsx');

var json = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
React.render(<Index data={json} />, document.getElementById('root'));
