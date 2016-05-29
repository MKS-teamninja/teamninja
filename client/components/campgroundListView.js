
var React = require('react');

var CampgroundList = React.createClass ({
  render: function () {
    return (
      <ul className='campground-list' >
      </ul>
    );
  }
  
})

module.exports = CampgroundList;












// Declare CampgroundList
// "use strict";
// var React = require('react');
// var ReactDOM = require('react-dom');
// var $ = require('jquery');

// export default class CampgroundList extends React.Component {

// 	render (){
// 		let campgroundNodes = this.props.data.map( campground => <CampgroundResult facilityPhoto={campground.facility_photo_url} 
// 					facilityName={campground.facility_name} facilityId={campground.facility_id} />);
// 		return(
// 			<div className='campground-box'>
// 				<h2>Campgrounds</h2>
// 				<h4 className='campground-count'>{this._getCampgroundsCount(campgrounds.length)}</h4>
// 				<div className='camp-list'>
// 					{campgroundNodes}
// 				</div>
// 			</div>
// 		)		
// 	}

// // Display the correct number of campgrounds

// 	_getCampgroundsCount(campgroundCount){
// 		if (campgroundCount === 0 || campgroundCount === undefined){
// 			return 'No campgrounds to display';
// 		} else if (campgroundCount === 1){
// 			return '1 campground';
// 		} else {
// 			return '${campgroundCount} campgrounds';
// 		}
// 	}
// }

