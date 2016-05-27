"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Search = require('./search')
//
// The initial page component
//
class Camp extends React.Component {
//
// Renders the user's input to p tag and appends to the search-list
//
  render() {
    
    return(
      <div className="search">
        <p className="users-camp">{this.props.campData}</p>          
      </div>
    );
  }
}
class SearchBoxPage extends React.Component {
  constructor() {
    super();
//
// TODO: Refactor for API response
//
    this.state = {
      campgrounds: [{id: 1, campData: 'Mark'}],
      searches: [
        { id: 1, searchData: 'SearchData:'},
        { id: 2, searchData: 'Vidush'}
      ]
    };
  }
//
// Renders the page
//
  render() {
    const campgrounds = this._getCampgrounds();
    const searches = this._getSearches();
    return (
      <div className='search-box'>
        <SearchList addSearch={this._addSearch.bind(this)} />
        <h3>Searches</h3>
        <div className='search-list'>
          {searches}
        </div>
        <div className='campground-list'>
          {campgrounds}
        </div>        
      </div>
    );
  }
  _getCampgrounds() {
  return this.state.campgrounds.map((camp) => {
  return (<Camp
            campData={camp.campData}
            key={camp.id} />);
  })
  }
//
//Gets campsite data
//TODO refactor accept longitude and latitude values
//{"lat":30.3587814,"lng":-97.9518524}
  _secondAjax(value){
        value = JSON.parse(value)
        // console.log("value:", JSON.parse(value))
        let urlValue ='http://localhost:4000/searchcg?lat='+value.lat+'&lon='+value.lng+'&rad=100';
        console.log('urlValue:', urlValue)
        $.ajax({
          method:"GET",
          url: urlValue,
          data:{},
//        
// On success: prints campsite data to page then calls this.setState
//
        success: (data) => {       
        console.log('Second success', data)
        let search = {
          id: this.state.searches.length + 1,
          searchData: JSON.stringify(data)
        };
        this.setState({ 
          searches: this.state.searches.concat([search])
        });
        }
      })
  }
//
// Call to Google's api
//
  _addSearch(value) {
    value = value.replace(" ", "");
    let urlValue = 'https://maps.googleapis.com/maps/api/geocode/json?address='+value+'&key= AIzaSyBHsN_BNT1GLrArFLeiNwkL6TJX7rmR3Lk';
    $.ajax({
      method:"GET",
      url: urlValue,
      data:{},
//
// On success: consoles the long and lat, then calls this._secondAjax
//      
       success: (data) => {
        let results = JSON.stringify(data.results[0].geometry.location)
        console.log('First success', data, results)
        //console.log('data', JSON.parse(data))
        console.log("data", results)
        this._secondAjax(results);

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
          <input placeholder="Street City State" ref={(value) => this._searchData = value}/>
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

class CampgroundList extends React.Component {

  render (){
    let allData = this.props.data;
    let campgroundNodes = allData.map( campground => <div className='camp-details'><label>{campground.facility_name}</label> <label>{campground.facility_id}</label></div>);
    return(
      <div className='campground-box'>
        <h2>Campgrounds</h2>
        <div className='camp-list'>
          {campgroundNodes}
        </div>
      </div>
    )   
  }
}



ReactDOM.render(
  <SearchBoxPage />,  document.getElementById('app')
  );




