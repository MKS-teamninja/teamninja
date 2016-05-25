//campground map

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
}