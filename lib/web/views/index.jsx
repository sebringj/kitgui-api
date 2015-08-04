var React = require('react');
var registeredComponents = {
  SignIn: require('./signIn.jsx')
};

var Index = React.createClass({
  render: function() {
    var Component = registeredComponents[this.props.data.component];
    var componentProps = this.props.data.componentProps;
    var component = React.createElement(Component, componentProps);
    return component;
  }
});

module.exports = Index;
