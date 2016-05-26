//campground map

//inherit campgrounds from parent
//create icons on map
//render map completely

class CampgroundMap extends React.Component {

	render (){
		const campgrounds = this._getCampgrounds();
		let campgroundNodes;
		if (this.state.showCampgroundList){
			return (
			<div className='campground-box'>
				<h2>Campgrounds</h2>
				<h4 className='campground-count'>{this._getCampgroundsCount(campgrounds.length)}</h4>
				<div className='camp-list'>
					{campgrounds}
				</div>
			</div>
		)}		
	}

// Display the correct number of campgrounds

	_getCampgroundsCount(campgroundCount){
		if (campgroundCount === 0 || campgroundCount === undefined){
			return 'No campgrounds to display';
		} else if (campgroundCount === 1){
			return '1 campground';
		} else {
			return '${campgroundCount} campgrounds';
		}
	}

// Hard coded server response data

	_getCampgrounds(){
		const campgroundsList = [
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

	return campgroundsList.map((campground) => {
			return (
					<CampgroundResult facilityPhoto={campground.facility_photo_url} 
					facilityName={campground.facility_name} facilityId={campground.facility_id} />
			);
	});	
}




function initMap() {
  // Create a map object and specify the DOM element for display.	
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.48276099999998, lng: -97.6564032},
    scrollwheel: false,
    zoom: 11
  });
  var myLatLng = {lat: 30.48276099999998, lng: -97.6564032};
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}

ReactDOM.render(
	<CampgroundMap />, document.getElementById('map');
)
//campground list

class CampgroundList extends React.Component {

	render (){
		const campgrounds = this._getCampgrounds();
		let campgroundNodes;
		if (this.state.showCampgroundList){
			campgroundNodes = <div className='campground-list'>{campgrounds}</div>;
		}
		return (
			<div className='campground-box'>
				<h2>Campgrounds</h2>
				<h4 className='campground-count'>{this._getCampgroundsCount(campgrounds.length)}</h4>
				{campgroundNodes}
			</div>
		)
	}

	_getCampgroundsCount(campgroundCount){
		if (campgroundCount === 0 || campgroundCount === undefined){
			return 'No campgrounds to display';
		} else if (campgroundCount === 1){
			return '1 campground';
		} else {
			return '${campgroundCount} campgrounds';
		}
	}
	_getCampgrounds(){
		const campgroundsList = [
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
  }
];
		return campgroundsList.map((campground) => {
			return (
				<li className='campgound-result'>
					<CampgroundResult facilityPhoto={campground.facility_photo_url} 
					facilityName={campground.facility_name} facilityId={campground.facility_id} />
				</li>
			);
		});
	}	
}

