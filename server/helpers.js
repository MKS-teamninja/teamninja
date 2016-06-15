//
// Helpers.js
//
// Contains functions to calculate distance
// as well as filter out all campgrounds in a set that are
// within a given range
//

var _ = require('underscore');
var Helpers = module.exports;

//
// Returns a filtered array of campgrounds within the
// user specified range
//
Helpers.cgFilter = function(cgs, userLat, userLon, radMi) {
  var lat = parseFloat(userLat);
  var lon = parseFloat(userLon);
  var rad = radMi * 1;
  var cgInRange = getBoundaryFn(lat, lon, rad);
  return _.filter(cgs, function(cg) { return cgInRange(cg) });
}

//
// Generate a boolean function using request parameters
// that'll return true if the distance between user
// and campground is within the user specified range
//
var getBoundaryFn = function(lat, lon, radMi) {
  var radKm = radMi * 1.6;
  return function(cg) {
    var cglat = parseFloat(cg.latitude);
    var cglon = parseFloat(cg.longitude);
    // console.log("radKm: ", radKm);

    // console.log("Cg " + cg.facility_id + " is " + distance(lat, lon, cglat, cglon) + " km away");
    return distance(lat, lon, cglat, cglon) <= radKm;
  }
}

//
// Convert degrees to radius
//
var deg2rad = function(deg){
  return deg * (Math.PI / 180);
};

//
// Calculates and returns the distance between two
// latitude/longitude points
//
var distance = function(lat1,lon1,lat2,lon2){
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
};

