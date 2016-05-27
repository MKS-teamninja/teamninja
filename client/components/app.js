"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var SearchBoxPage = require('./intialView');
//
// The initial page component
//

// var React = require('react');

// var HelloMessage = React.createClass({
//   render: function() {
//     return <div>Hello {this.props.name}</div>;
//   }
// });

// module.exports = HelloMessage;



ReactDOM.render(
  <SearchBoxPage />,  document.getElementById('app')
  );






