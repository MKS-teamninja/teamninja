"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Search = require('./search')
var SearchList = require('./searchlist')
var CampgroundList = require('./campgroundListView')
//
// The initial page component
//
class SearchBoxPage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searches: [
      ],
      campsites: [
      ],
      showCampgroundList: false,

    };
    this._addSearch =this._addSearch.bind(this);
  }
//
// Renders the page
//
  render() {
    const campsites = this._getCampsites();
    const searches = this._getSearches();
    console.log("searches ln 33 app.js:", searches)
    let campgrounds = this.state.data;
    return (
      <div className='search-box'>
        <SearchList addSearch={this._addSearch} />
        <div className='campground-list'>
          {this.state.showCampgroundList ? <CampgroundList1 data={campgrounds} /> : null}
        </div>
        <Campsite />
        <div className='campsite-list'>
          {campsites}
        </div>
      </div>
    );
  }
    // state changes on submit button click 

  _handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    let campgrounds = this._getCampgrounds();
    this.setState({showCampgroundList: true});
    let newData = campgrounds;
    this.setState({data: newData});
  }

  // Hard coded server response data

  _getCampgrounds(data){
    this.setState({data: data});
  }

//
//Gets campsites data
//
_fetchCampSites(){
  $.ajax({
    method:"GET",
    url: 'http://localhost:4000/searchcs?cgId=820400',
    data:{},
    success: (data) => {
      console.log('campsites', data)
      let campsite ={
        id: this.state.campsites.length + 1,
        campsite: JSON.stringify(data)
      };
      this.setState({
        campsites: this.state.campsites.concat([campsite])
      });
    }
  })
}

//
//Gets campground data
//
  _fetchCampData(value){
        value = JSON.parse(value)
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
        this._getCampgrounds(data);       
        let search = {
          id: this.state.searches.length + 1,
          searchData: data.map((data) => {
            return JSON.stringify(data.facility_name)
          })

        };
        this.setState({ 
          searches: this.state.searches.concat([search]),
          showCampgroundList: true
        });
        this._fetchCampSites();
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
        this._fetchCampData(results);

      },
      error: function (status, error) {
        console.log('google query error')
        alert('Google query error', error);
      }
         })
  }
  _getCampsites() {
    return this.state.campsites.map((campsite) => {
      return (<Campsite
                campsite={campsite.campsite}
                key={campsite.id} />);
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
// Display Campground List

class CampgroundList1 extends React.Component {

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

class Campsite extends React.Component {
//
// Renders the user's input to p tag and appends to the search-list
//
  render() {
    
    return(
      <div className="campsite-list">
        <p className="users-campsite">{this.props.campsite}</p>          
      </div>
    );
  }
}
 





ReactDOM.render(
  <SearchBoxPage />,  document.getElementById('app')
  );




