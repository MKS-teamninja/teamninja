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
    center: {lat: -34.397, lng: 150.644},
    scrollwheel: false,
    zoom: 8
  });
}