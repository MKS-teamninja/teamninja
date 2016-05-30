var React = require('react');
SearchList = React.createClass ({
//
// Creates the input element and button element
//
  render: function (){
    return (
      <form className='search-list' onSubmit={(value) => this._handleSubmit(value)}>
        <div className='search-list-fields'>
          <input placeholder="Street City State" ref={(value) => this._searchData = value}/>
        </div>
        <div className='search-list-actions'>
          <button type='submit'>
            submit
          </button>
        </div>
      </form>
    );
  },
  
  _handleSubmit: function(e) {
    e.preventDefault();

    this.props.addSearch(this._searchData.value);

    this._searchData.value = '';

    let campgrounds = this._getCampgrounds();
    this.setState({showCampgroundList: true});
    let newData = campgrounds;
    this.setState({data: newData});

    
  }
})

module.exports = SearchList;