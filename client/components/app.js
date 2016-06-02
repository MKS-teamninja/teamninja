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
                            <Connections />
                            <LastView />
                            <div className='col-md-12'>
                                <SearchList addSearch={this._addSearch}/>
                            </div>
                        </div>
                    <div className='row row-horizon'>
                        <div className='col-md-4 '>
                            {this.state.showCampgroundList ? <CampgroundList1 data={campgrounds}/> : null}
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
                console.log('campsites', data);
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
        console.log(value);
        value = JSON.parse(value);

        let urlValue = '/searchcg?lat=' + value.lat + '&lon=' + value.lng + '&rad=100';
        console.log('urlValue:', urlValue);
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
        console.log(value);
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
                    console.log(this);
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
    onclick(campground){
        socket.emit('clickedCampground', campground);
    }
    render() {
        let allData = this.props.data;
        var CampgroundListDOM = this;
        let campgroundNodes = allData.map(function (campground) {
            let photo = "http://reserveamerica.com" + campground.facility_photo_url;
            console.log('photo', photo);
            var clickEvent = CampgroundListDOM.onclick.bind(this, campground);
            return <div className='camp-details row' onClick={clickEvent}><img src={photo}/><label>{campground.facility_name}</label></div>;
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

var Connections = React.createClass({
    getInitialState:function(){
        return {connectionNumber:""}
    },
    render:function(){
        return (
            <div className="connection">
                <p> Number of user online : {this.state.connectionNumber} </p>
            </div>
        )
    },
    componentDidMount:function(){
        var connectionDOM = this;
        socket.emit('askConnectionNumber');
        socket.on('returnConnectionNumber', function(counter){
            connectionDOM.setState({connectionNumber:counter});
        });
        socket.on('connected', function(counter){
            connectionDOM.setState({connectionNumber:counter});
        });
    }

})

var LastView = React.createClass({
    getInitialState:function(){
        return {lastView:""}
    },
    render:function(){
        return (
            <div className="last-view">
                <p>{this.state.lastView} </p>
            </div>
        )
    },
    componentDidMount:function(){
        var connectionDOM = this;
        socket.on('lastViewed', function(campsite){
            connectionDOM.setState({lastView:"someone just viewed "+campsite});
        });
    }

})


ReactDOM.render(
    <SearchBoxPage />, document.getElementById('app')
);




