//
// Child component of SearchBoxPage
//
var React = require('react');
var Search = React.createClass ({
//
// Renders the user's input to p tag and appends to the search-list
//
  render: function () {
    
    return(
      <div className="search">
        <p className="users-search">{this.props.searchData}</p>          
      </div>
    );
  }
})

module.exports = Search;