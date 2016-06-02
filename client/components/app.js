"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Search = require('./search');
var SearchList = require('./searchlist');
var CampgroundList = require('./campgroundListView');
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
        return (
            <div >
                <div className='row row-horizon'>
                    <div className='search-box'>
                        <div className='col-xs-12'>
                            <SearchList addSearch={this._addSearch}/>
                        </div>
                    </div>
                    <div className='row row-horizon'>
                        <div className='col-xs-4'>
                            {this.state.showCampgroundList ? <CampgroundList1 data={campgrounds}/> : null}
                        </div>
                        <div className='col-xs-6 col-xs-offset-1'>
                            {this.state.showCampgroundList ? <CampgroundInfo data={campgrounds} /> : null}
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
            url: '/searchcs?cgId=820400',
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
    _fetchCampData(value) {
        value = JSON.parse(value);

        let urlValue = '/searchcg?lat=' + value.lat + '&lon=' + value.lng + '&rad=100';
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
      var  scopehelper = this;
        value = value.replace(" ", "");
        if (value === '') {

            var usePosition = function(value){
                var obj = {};
                obj.lat = value.coords.latitude;
                obj.lng = value.coords.longitude;
                obj = JSON.stringify(obj);
               scopehelper._fetchCampData(obj);
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
                    this._fetchCampData(results);

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
                key={search.id}/>);
        })
    }
}
// Display Campground List

class CampgroundList1 extends React.Component {

    render() {
        let allData = this.props.data;
        let campgroundNodes = allData.map(function (campground) {
            let photo = "http://reserveamerica.com" + campground.facility_photo_url;
            return <div className='camp-details row'><img src={photo}/><label>{campground.facility_name}</label></div>;
        });
        return (
            <div className='campground-list '>
                <h2>Campgrounds</h2>
                <div className='camp-list'>
                    {campgroundNodes}
                </div>
            </div>
        )
    }
}

class CampgroundInfo extends React.Component {
    render() {
        let info = this.props.data[0];

        return (
          <div className='campground-info'>
            <img src={"http://reserveamerica.com"+info.facility_photo_url} />
            <ul>
            <div><li>Facility name: {info.facility_name}</li></div>
            <li>Contract type: {info.contract_type}</li>
            <li>Latitude: {info.latitude}</li>
            <li>Longitude: {info.longitude}</li>
            <li>Waterfront: {info.waterfront}</li>
            <li>Pets allowed: {info.pets === 1 ? 'Yes':'No'}</li>
            <li>Water hookup: {info.water === 1 ? 'Yes':'No'}</li>
            <li>Power amperage: {info.amps === 0 ? 'No power':info.amps}</li>
            <li>Sewer hookup: {info.sewer === 1 ? 'Yes':'No'}</li>
            </ul>
          </div>
        )
    }
}

class Campsite extends React.Component {
//
// Renders the user's input to p tag and appends to the search-list
//
    render() {
        {/*campsiteObject = {
            amps:0
            campground_id_fk:820400
            campsite_id:4305
            max_eq_length:0
            max_people:8
            pets:1
            sewer:0
            site_id:1100
            site_name:"01"
            site_type:"Tent Only"
            trail_name:"Turkey Bend Recreation Area"
            water:0
            waterfront:""
        }
        */}
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




