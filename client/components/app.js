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
            showCampgroundInfo: false,
            selectedIndex: 0,
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
                            <div className='col-xs-12'>
                                <SearchList addSearch={this._addSearch}/>
                            </div>
                        </div>
                    <div className='row row-horizon'>
                        <div className='col-xs-4'>
                            {this.state.showCampgroundList ? <CampgroundList1 data={campgrounds} handleCampgroundClick={this._handleCampgroundClick.bind(this)}/> : null}
                        </div>
                        <div className='col-xs-6 col-xs-offset-1'>
                            {this.state.showCampgroundInfo ? <CampgroundInfo data={campgrounds} index={this.state.selectedIndex} /> : null}
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

    _handleCampgroundClick(index) {
        this.setState({
            selectedIndex: index,
            showCampgroundInfo: true
        });
        var campground = this.state.data[index];
        socket.emit('clickedCampground', campground);
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
//
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
    onclick(campground) {
        socket.emit('clickedCampground', campground);
    }

    _correctCasing(str) {
        return str.split(' ')
        .map(function(word) {
            if(word === "") { return word }
            return word[0] + word.slice(1).toLowerCase();
        }).reduce(function(acc, cur) {
            return acc + " " + cur;
        });
    }

    render() {
        let allData = this.props.data;
        var CampgroundListDOM = this;
        let campgroundNodes = allData.map(function (campground, index) {
            let photo = "http://reserveamerica.com" + campground.facility_photo_url;
            return <div className='camp-details row' onClick={() => (CampgroundListDOM.props.handleCampgroundClick(index))}><img src={photo}/><label>{CampgroundListDOM._correctCasing(campground.facility_name)}</label></div>;
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
    _correctCasing(str) {
        return str.split(' ')
        .map(function(word) {
            if(word === "") { return word }
            return word[0] + word.slice(1).toLowerCase();
        }).reduce(function(acc, cur) {
            return acc + " " + cur;
        });
    }

    render() {
        let index = this.props.index;
        let info = this.props.data[index];


        return (
          <div className='campground-info'>
            <img src={"http://reserveamerica.com"+info.facility_photo_url} />
            <div className="caption">{this._correctCasing(info.facility_name)}</div>
            <p></p>
            <ul>
            <li><span className="bold">Type:&nbsp;</span> {this._correctCasing(info.contract_type)}</li>
            {info.waterfront === "" ? null:<li><span className="bold">Waterfront:&nbsp;</span>  {info.waterfront}</li>}
            <li><span className="bold">Pets allowed:&nbsp;</span>  {info.pets === 1 ? 'Yes':'No'}</li>
            <li><span className="bold">Water hookup:&nbsp;</span>  {info.water === 1 ? 'Yes':'No'}</li>
            <li><span className="bold">Power amperage:&nbsp;</span>  {info.amps === 1 ? 'Yes':'No'}</li>
            <li><span className="bold">Sewer hookup:&nbsp;</span>  {info.sewer === 1 ? 'Yes':'No'}</li>
            </ul>
            <div id="map"></div>
          </div>
        )
    }
    componentDidUpdate(){
        var campground = this.props.data[this.props.index];
        google.maps.event.addDomListenerOnce(window, 'click', initMap.bind(null, {lat:campground.latitude, lng:campground.longitude, title:campground.facility_name}));
    }
    componentDidMount(){
        var campground = this.props.data[this.props.index];
        google.maps.event.addDomListenerOnce(window, 'click', initMap.bind(null, {lat:campground.latitude, lng:campground.longitude, title:campground.facility_name}));
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

var Connections = React.createClass({
    getInitialState:function(){
        return {connectionNumber:""}
    },
    render:function(){
        return (
            <div className="connection">
                Number of user online : {this.state.connectionNumber}
            </div>
        )
    },
    componentDidMount:function(){
        // var connectionDOM = this;
        socket.emit('askConnectionNumber');
        socket.on('returnConnectionNumber', function(counter){
            this.setState({connectionNumber:counter});
        }.bind(this));
        socket.on('connected', function(counter){
            this.setState({connectionNumber:counter});
        }.bind(this));
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
        // var connectionDOM = this;
        socket.on('lastViewed', function(campsite){
            this.setState({lastView:"Someone just viewed "+campsite});
        }.bind(this));
    }

})

ReactDOM.render(
    <SearchBoxPage />, document.getElementById('app')
);
