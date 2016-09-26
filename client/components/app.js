"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var GoogleReact = require('react-gmaps'),
    Gmaps = GoogleReact.Gmaps,
    Marker = GoogleReact.Marker;

var $ = require('jquery');
var Search = require('./search');
var SearchList = require('./searchlist');
var CampgroundList = require('./campgroundListView');
var Icons = require('../assets/icons.js');
//
// The initial page component
//
class SearchBoxPage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searches: [],
      campsites: [],
      showCampgroundList: false,
      tempobj: {}
    };
    this._addSearch = this._addSearch.bind(this);
  }
  
//
// Renders the page
//
  render() {
    let campgrounds = this.state.data;
    let centerLatLon = this.state.centerLatLon;
    let locString = this.state.locationString;

    return (
      <div >
        <div className='fadeBar'></div>
        <div className='logoBox'></div>
        <h1 className='title'>OFF THE</h1>
        <div className='titleBar'></div>
        <h1 className='grid'>GRID</h1>
        <div className='row row-horizon'>
          <div className='search-box'>
            <img src="logo.png"/>
            <div className='col-md-12'>
              <SearchList addSearch={this._addSearch}/>
            </div>
          </div>
          <div className='row row-horizon'>
            <div className='col-md-5 '>
              {this.state.showCampgroundList ? <CampgroundList1 data={campgrounds} locationString={locString}/> : null}
            </div>
            <div className='col-md-8 '>
              {this.state.showCampgroundList ? <CampgroundsMap data={campgrounds} center={centerLatLon}/> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

    // Hard coded server response data

  _getCampgrounds(data) {
    this.setState({data: data});
  }

//
//Gets campsites data
//
  _fetchCampSites() {
    $.ajax({
      method: "GET",
      url: 'http://localhost:4000/searchcs?cgId=820400',
      data: {},
      success: (data) => {
        let campsite = {
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
  _fetchCampData(value, valObj) {

    this.setState({'centerLatLon': {'lat': valObj.lat, 'lon': valObj.lng}});
    value = JSON.parse(value);

    let urlValue = 'http://localhost:4000/searchcg?lat=' + value.lat + '&lon=' + value.lng + '&rad=100';
    $.ajax({
      method: "GET",
      url: urlValue,
      data: {},
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

  _addSearch(value) {
    
    this.setState({'locationString': value});    
    
    var  scopehelper = this;
      value = value.replace(" ", "");
      if (value === '') {
        var usePosition = function(value){
          var obj = {};
          obj.lat = value.coords.latitude;
          obj.lng = value.coords.longitude;
          var objString = JSON.stringify(obj);
         scopehelper._fetchCampData(objString, obj);
        };
        var getLocation=function(){
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(usePosition);
          } else
          {
            alert('this browser does not support geolocation, please enter a text value');
          }
        };

       getLocation();
       }
    else {
        // get a google server api key
        // and plug in with line 140 at &key=
      let urlValue = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key= ';
      $.ajax({
        method: "GET",
        url: urlValue,
        data: {},
//
// On success: consoles the long and lat, then calls this._secondAjax
//
        success: (data) => {
          let results = JSON.stringify(data.results[0].geometry.location);
          console.log(this);
          this._fetchCampData(results, data.results[0].geometry.location);

        },
        error: function (status, error) {
          alert('Google query error', error);
        }
      })
    }
  }

  _getSearches() {
    return this.state.searches.map((search) => {
      return (<Search
        searchData={search.searchData}
        key={search.id}/>
        );
    })
  }
}
// Display Campground List

class CampgroundList1 extends React.Component {

  render() {
    let allData = this.props.data;
    let campgroundNodes = allData.map(function (campground) {
      let photo = "http://reserveamerica.com" + campground.facility_photo_url;
      if ( photo === 'http://reserveamerica.com/images/nophoto.jpg') {
        photo = Icons.defaultFire;
      }
      let water, pets, tent, rv, amps, sewer;
      if ( campground.water === 1 ){
        water = Icons.water;
      }
      if ( campground.pets === 1 ){
        pets = Icons.pets;
      }
      if ( campground.sewer === 1){
        sewer = Icons.sewer;
      }
      if ( campground.amps === 1){
        amps = Icons.amps
      }

      return (<div className='camp-details row'>
                <div className="campgroundPhotoDiv">
                  <img className="campgroundPhoto"src={photo}/>
                </div>
                <div className="campgroundInfo">
                  <div classID="campgroundName">
                    <label>{campground.facility_name.toUpperCase()}</label>
                  </div>
                  <div className='amenities'>
                    {campground.water ? <img className="amenitiesIcon" title="Water Hookup" src={water}/> : <span />}
                    {campground.pets ? <img className="amenitiesIcon" title="Pets Allowed" src={pets}/> : <span />}
                    {campground.sewer ? <img className="amenitiesIcon" title="Septic Hookup" src={sewer}/> : <span />}
                    {campground.amps ? <img className="amenitiesIcon" title="Electricity" src={amps}/> : <span />}
                  </div>
                </div>
              </div>)
    });

    return (<div className="campgroundSearchResults">
              <h2 classID='campgroundsLabel' > {"Campgrounds near " + (this.props.locationString.slice(0, 1).toUpperCase() + this.props.locationString.slice(1).toLowerCase() || "Austin")}</h2>
              <br />
              <div className='campground-list '>
                <div className='camp-list'>
                  {campgroundNodes}
                </div>
              </div>
            </div>)
  }
}

class CampgroundsMap extends React.Component {

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    let allData = this.props.data;
    let centerLatLon = this.props.center;
    let campgroundNodes = allData.map((campground, key) => {
      return (<Marker
              key = {key}
              lat = {Number(campground.latitude)}
              lng = {Number(campground.longitude)}
              draggable = {false}
              onClick = {this._onClickSayHello} />)
    })

    if(centerLatLon){
      return (<Gmaps
                  className={'gMap'}
                  lat={centerLatLon.lat} //30.2689147,"lng":-97.7403779
                  lng={centerLatLon.lon}
                  zoom={8}
                  mapTypeId={"roadmap"}
                  params={{v: '3.exp', key: 'AIzaSyCCfn3S6RHaKETANh7_lrVHpc25D7IcXB4'}}>
                    {campgroundNodes}
                </Gmaps>)
    } else {
      console.log('fell through');
      return (<Gmaps
              className={'gMap'}
              lat={30.268} //30.2689147,"lng":-97.7403779
              lng={-97.740}
              zoom={10}
              mapTypeId={"roadmap"}
              params={{v: '3.exp', key: 'AIzaSyCCfn3S6RHaKETANh7_lrVHpc25D7IcXB4'}} />)
    }
  }

}

class Campsite extends React.Component {
//
// Renders the user's input to p tag and appends to the search-list
//
  render() {

    return (
      <div className="campsite-list">
        <p className="users-campsite">{this.props.campsite}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <SearchBoxPage />, document.getElementById('app')
);
