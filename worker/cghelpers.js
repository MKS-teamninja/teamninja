var xmlToJs = require('xml2js').parseString;
var rp = require('request-promise');
var _ = require('underscore');
var db = require('../db/db');

var Camp = module.exports;

//
// Promisify the xml2js XML parse function
//
var promisedXmlToJs = function (xml) {
  return new Promise(function (resolve, reject) {
    xmlToJs(xml, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  })
};

//
// Build a campground element with property names matching
// our database schema
//
var buildCgObject = function (cg) {
  var cgTemplate = {};
  cgTemplate.contract_id = cg["contractID"];
  cgTemplate.contract_type = cg["contractType"];
  cgTemplate.facility_id = cg["facilityID"];
  cgTemplate.facility_name = cg["facilityName"]
  cgTemplate.facility_photo_url = cg["faciltyPhoto"];
  cgTemplate.latitude = cg["latitude"];
  cgTemplate.longitude = cg["longitude"];
  cgTemplate.waterfront = cg["sitesWithWaterfront"];
  cgTemplate.amps = cg["sitesWithAmps"] === 'Y' ? 1 : 0;
  cgTemplate.pets = cg["sitesWithPetsAllowed"] === 'Y' ? 1 : 0;
  cgTemplate.sewer = cg["sitesWithSewerHookup"] === 'Y' ? 1 : 0;
  cgTemplate.water = cg["sitesWithWaterHookup"] === 'Y' ? 1 : 0;
  return cgTemplate;
}

//
// Build a campsite element with property names matching
// our database schema
//
var buildCsObject = function (cs, cg_id) {
  var csTemplate = {};
  csTemplate.campground_id_fk = cg_id;
  csTemplate.trail_name = cs["Loop"];
  csTemplate.max_eq_length = cs["Maxeqplen"];
  csTemplate.max_people = cs["Maxpeople"];
  csTemplate.site_id = cs["SiteId"]
  csTemplate.site_name = cs["Site"]
  csTemplate.site_type = cs["SiteType"];
  csTemplate.waterfront = cs["sitesWithWaterfront"];
  csTemplate.amps = cs["sitesWithAmps"] === 'Y' ? 1 : 0;
  csTemplate.pets = cs["sitesWithPetsAllowed"] === 'Y' ? 1 : 0;
  csTemplate.sewer = cs["sitesWithSewerHookup"] === 'Y' ? 1 : 0;
  csTemplate.water = cs["sitesWithWaterHookup"] === 'Y' ? 1 : 0;
  return csTemplate;
}

//
// Fetch, parse, and filter campground or campsite info
//
Camp.fetch = function(request, cgId) {
  return rp(request)
    .then(function (res) {
      console.log("Successfully fetched camp info");
      return promisedXmlToJs(res);
    })
    .catch(function (err) {
      console.log("Failed to fetch camp info: ", err);
    })
    .then(function (jsres) {
      console.log("Successfully parsed camp info:");
      return _.chain(jsres.resultset.result)
        .pluck('$')
        .filter(function (res) {
          return request.uri.includes("campgrounds") ? !(res.contractType === "PRIVATE") : true;
        })
        .map(function (res) {
          return request.uri.includes("campgrounds") ? buildCgObject(res) : buildCsObject(res, cgId);
        })
        .value();
    })
    .catch(function (err) {
      console.log("XML parse error: ", err);
    })
};
