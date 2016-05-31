"use strict";
//
// Child component of SearchBoxPage
//
var React = require('react');
var Search = React.createClass ({
//
// Renders the user's input to p tag and appends to the search-list
//
  render: function () {
  	let campground = this.props.searchData;
    return(
      <div className="search">
      	<p className="campground">{campground}</p>        
      </div>
    );
  }
});

module.exports = Search;
