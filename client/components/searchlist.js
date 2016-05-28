var React = require('react');
SearchList = React.createClass ({
//
// Creates the input element and button element
//
  render: function (){
    return (
      <form className='search-list' onSubmit={this._handleSubmit.bind(this)}>
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

    
  }
})

module.exports = SearchList;