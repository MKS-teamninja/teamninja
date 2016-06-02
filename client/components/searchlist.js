var React = require('react');
var SearchList = React.createClass ({
//
// Creates the input element and button element
//
  render: function (){
    return (
        <form className='search-list' onSubmit={(value) => this._handleSubmit(value)}>
          <div className='search-list-fields'>
            <input placeholder="Location" ref={(value) => this._searchData = value}/>
          </div>
          <div className='search-list-actions'>
            <button type='submit'>
              Find Campground
            </button>
          </div>
        </form>
    );
  },

  _handleSubmit: function(e) {
    e.preventDefault();

    this.props.addSearch(this._searchData.value);

    this._searchData.value = '';

    //let campgrounds = this._getCampgrounds();
    this.setState({showCampgroundList: true});
    //  this.setState({data: campgrounds});
  }
});

module.exports = SearchList;