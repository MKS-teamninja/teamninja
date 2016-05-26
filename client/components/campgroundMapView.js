//campground map

//inherit campgrounds from parent
//create icons on map
//render map completely

class CampgroundMap extends React.Component {
	render(){
		return (
			<div className='campground-map'>
			<!--CampgroundIcon Component-->
			<div className='campground-icon'>
			</div>
			<!--CampgroundIcon End-->
			</div>
		)
	}
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