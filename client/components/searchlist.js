var React = require('react');
var SearchList = React.createClass ({
//
// Creates the input element and button element
//
  render: function (){
    return (
      <form className='search-list' onSubmit={(value) =>  this._handleSubmit(value) }>
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


    //let campgrounds = this._getCampgrounds();
    // console.log('Search Data value', this._searchData.value);
    // I trusted you. VVVV VVVV VVVV
    //  this.setState({showCampgroundList: true, locationString: this._searchData.value});
    //  ^^^^ This code is a lie ^^^^
    //  this.setState({data: campgrounds});
    
    this._searchData.value = '';
  }
});

module.exports = SearchList;