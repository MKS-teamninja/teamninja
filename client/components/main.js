//main component
"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

//
// The initial page component
//
//SearchBoxPage
  //CampgroundList
    //CampgroundResult
  //CampgroundMap
    //CampgroundIcon

class SearchBoxPage extends React.Component {

  constructor() {
    super();
//
// Declare initial states
//
    this.state = {
      data: [],
      showCampgroundList: false,
      showCampgroundMap: false,
      showCampsiteList: false,
      showCampsiteMap: false
    };
  }


//
// Renders the page
//
  render() {

      let campgrounds = this._getCampgrounds();
       return (
          <div className='search-block'>
            <form className='search-box' onSubmit={this._handleSubmit.bind(this)}>
                <h1>The Campground Search App</h1>
                <input placeholder="Search by Address" ref={(input) => this._location = input} />
                <button type='submit'>Submit</button>
            </form>
            <div className='campground-list'>
              {this.state.showCampgroundList ? <CampgroundList data={campgrounds} /> : null}
            </div>
          </div>
      );
  }
  // Hard coded server response data

  _getCampgrounds(searches){
    return [
      {
        "campground_id": 14,
        "contract_id": "NRSO",
        "contract_type": "FEDERAL",
        "facility_id": 71074,
        "facility_name": "CEDAR BREAKS PARK",
        "facility_photo_url": "/images/nophoto.jpg",
        "latitude": "30.6816667",
        "longitude": "-97.7330556",
        "waterfront": "",
        "water": 1,
        "amps": 1,
        "pets": 1,
        "sewer": 0
      },
      {
        "campground_id": 29,
        "contract_id": "NRSO",
        "contract_type": "FEDERAL",
        "facility_id": 72426,
        "facility_name": "FRIENDSHIP PARK",
        "facility_photo_url": "/webphotos/NRSO/pid72426/0/80x53.jpg",
        "latitude": "30.73",
        "longitude": "-97.3397222",
        "waterfront": "",
        "water": 0,
        "amps": 1,
        "pets": 1,
        "sewer": 0
      },
      {
        "campground_id": 35,
        "contract_id": "NRSO",
        "contract_type": "FEDERAL",
        "facility_id": 71231,
        "facility_name": "JIM HOGG PARK",
        "facility_photo_url": "/images/nophoto.jpg",
        "latitude": "30.6816667",
        "longitude": "-97.7330556",
        "waterfront": "",
        "water": 1,
        "amps": 1,
        "pets": 1,
        "sewer": 0
      },
      {
        "campground_id": 55,
        "contract_id": "LCRA",
        "contract_type": "REGIONAL",
        "facility_id": 820450,
        "facility_name": "McKinney Roughs Nature Park",
        "facility_photo_url": "/webphotos/LCRA/pid820450/0/80x53.jpg",
        "latitude": "30.1406417",
        "longitude": "-97.4593111",
        "waterfront": "Riverfront",
        "water": 0,
        "amps": 0,
        "pets": 1,
        "sewer": 0
      },
      {
        "campground_id": 59,
        "contract_id": "LCRA",
        "contract_type": "REGIONAL",
        "facility_id": 820250,
        "facility_name": "Muleshoe Bend Recreation Area",
        "facility_photo_url": "/webphotos/LCRA/pid820250/0/80x53.jpg",
        "latitude": "30.4870472",
        "longitude": "-98.0985778",
        "waterfront": "",
        "water": 0,
        "amps": 0,
        "pets": 1,
        "sewer": 0
      },
      {
        "campground_id": 85,
        "contract_id": "NRSO",
        "contract_type": "FEDERAL",
        "facility_id": 93618,
        "facility_name": "RUSSELL PARK",
        "facility_photo_url": "/webphotos/NRSO/pid93618/0/80x53.jpg",
        "latitude": "30.6775",
        "longitude": "-97.7591667",
        "waterfront": "",
        "water": 1,
        "amps": 1,
        "pets": 1,
        "sewer": 0
      },
      {
        "campground_id": 94,
        "contract_id": "NRSO",
        "contract_type": "FEDERAL",
        "facility_id": 71448,
        "facility_name": "TAYLOR",
        "facility_photo_url": "/webphotos/NRSO/pid71448/0/80x53.jpg",
        "latitude": "30.6641667",
        "longitude": "-97.3644444",
        "waterfront": "",
        "water": 1,
        "amps": 1,
        "pets": 1,
        "sewer": 0
      },
      {
        "campground_id": 95,
        "contract_id": "NRSO",
        "contract_type": "FEDERAL",
        "facility_id": 79012,
        "facility_name": "TEJAS PARK",
        "facility_photo_url": "/webphotos/NRSO/pid79012/0/80x53.jpg",
        "latitude": "30.6959444",
        "longitude": "-97.8271167",
        "waterfront": "",
        "water": 0,
        "amps": 0,
        "pets": 1,
        "sewer": 0
      },
      {
        "campground_id": 97,
        "contract_id": "LCRA",
        "contract_type": "REGIONAL",
        "facility_id": 820400,
        "facility_name": "Turkey Bend Recreation Area",
        "facility_photo_url": "/webphotos/LCRA/pid820400/0/80x53.jpg",
        "latitude": "30.5060028",
        "longitude": "-98.1049389",
        "waterfront": "",
        "water": 0,
        "amps": 0,
        "pets": 1,
        "sewer": 0
      },
      {
        "campground_id": 105,
        "contract_id": "NRSO",
        "contract_type": "FEDERAL",
        "facility_id": 71502,
        "facility_name": "WILLIS CREEK",
        "facility_photo_url": "/images/nophoto.jpg",
        "latitude": "30.6958333",
        "longitude": "-97.4013889",
        "waterfront": "",
        "water": 1,
        "amps": 1,
        "pets": 1,
        "sewer": 1
      },
      {
        "campground_id": 106,
        "contract_id": "NRSO",
        "contract_type": "FEDERAL",
        "facility_id": 71505,
        "facility_name": "WILSON H FOX",
        "facility_photo_url": "/webphotos/NRSO/pid71505/0/80x53.jpg",
        "latitude": "30.6800639",
        "longitude": "-97.3422694",
        "waterfront": "",
        "water": 1,
        "amps": 1,
        "pets": 1,
        "sewer": 0
      }];
  }

  // state changes on submit button click 

  _handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    let campgrounds = this._getCampgrounds();
    let location = this._location;
    this.setState({showCampgroundList: true});
    this.setState({showCampgroundMap: true});
    this.setState({data: campgrounds});
  }
}

ReactDOM.render(
  <SearchBoxPage />, document.getElementById('app')
); 


// Display Campground List

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
  }}
