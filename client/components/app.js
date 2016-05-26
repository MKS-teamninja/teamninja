"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
//
// The initial page component
//
class SearchBoxPage extends React.Component {
  constructor() {
    super();
//
// TODO: Refactor for API response
//
    this.state = {
      searches: [
        { id: 1, searchData: 'Jack'},
        { id: 2, searchData: 'Vidush'}
      ]
    };
  }
//
// Renders the page
//
  render() {
    const searches = this._getSearches();
    return (
      <div className='search-box'>
        <SearchList addSearch={this._addSearch.bind(this)} />
        <h3>Searches</h3>
        <div className='seach-list'>
          {searches}
        </div>
      </div>
    );
  }
//
// Method to add search data
// TODO: Fetch Google API data 
//
// componentWillMount(){
//   this._addSearch();
// }

  _addSearch(data) {
    $.ajax({
      method:"GET",
      url:"https://maps.googleapis.com/maps/api/geocode/json?address=11324+Autumn+Ash+Manchaca,+TX&key= AIzaSyBHsN_BNT1GLrArFLeiNwkL6TJX7rmR3Lk",
      data:{},
       success: (data) => {
        let results = data.results[0].geometry
        console.log('First success', data, results[0])
        //console.log('data', JSON.parse(data))
        console.log("data", JSON.stringify(results['location']))
        let search = {
          id: this.state.searches.length + 1,
          searchData: JSON.stringify(results['location'])
        };
        this.setState({ 
          searches: this.state.searches.concat([search])
        });

           }
         })
  }

  _getSearches() {
    return this.state.searches.map((search) => {
      return (<Search
                searchData={search.searchData}
                key={search.id} />);
    })
  }
}
//
// Child component of SearchBoxPage
//
class SearchList extends React.Component {
//
// Creates the input element and button element
//
  render() {
    return (
      <form className='search-list' onSubmit={this._handleSubmit.bind(this)}>
        <div className='search-list-fields'>
          <input placeholder="Search Box" ref={(value) => this._searchData = value}/>
        </div>
        <div className='search-list-actions'>
          <button type='submit'>
            submit
          </button>
        </div>
      </form>
    );
  }
  _handleSubmit(e) {
    e.preventDefault();

    this.props.addSearch(this._searchData.value);

    this._searchData.value = '';
    
  }
}
//
// Child component of SearchBoxPage
//
class Search extends React.Component {
//
// Renders the user's input to p tag and appends to the search-list
//
  render() {
    
    return(
      <div className="search">
        <p className="users-search">{this.props.searchData}</p>          
      </div>
    );
  }
}

ReactDOM.render(
  <SearchBoxPage />,  document.getElementById('app')
  );





