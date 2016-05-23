//
// Campground grabber
//
// This worker queries the campground API once a day and upserts the campground database.
//
var cfg = require('../config');
var db = require('../db/db');
var rp = require('request-promise');
var _ = require('underscore');
var xmlToJs = require('xml2js').parseString;

var promisedXmlToJs = function (xml) {
  return new Promise(function (resolve, reject) {
    xmlToJs(xml, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  })
};

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

var campgrounds = {
  uri: 'http://api.amp.active.com/camping/campgrounds?pstate=TX',
  qs: {
    api_key: cfg.getCgApiKey()
  },
  headers: {
    'User-Agent': 'request-promise'
  },
  json: true
};

// TODO: fill in contractCode and parkId dynamically. Hardcoded for now.
var campsites = {
  uri: 'http://api.amp.active.com/camping/campsites?contractCode=CO&parkId=50032',
  qs: {
    api_key: cfg.getCgApiKey()
  },
  headers: {
    'User-Agent': 'request-promise'
  },
  json: true
};


rp(campgrounds)
  .then(function (res) {
    console.log("Successfully fetched campgrounds");
    return promisedXmlToJs(res);
  })
  .then(function (jsres) {
    console.log("Successfully parsed campground info:");
    return _.chain(jsres.resultset.result)
            .pluck('$')
            .filter(function (cg) {
              return !(cg.contractType === "PRIVATE");
            })
            .map(function (cg) {
              return buildCgObject(cg);
            })
            .value();
  })
  .then(function (campgrounds) {
    //
    // Use cleaned results to build an array of objects we can insert right into the table
    //
    console.log("Cleaned results: ", campgrounds)
  })
  .catch(function (err) {
    console.log("Campground fetch error:", err);
  })
  .catch(function (err) {
    console.log("Campground XML parse error:", err);
  })

// rp(campsites)
//   .then(function (res) {
//     return promisedXmlToJs(res);
//   })
//   .then(function (jsres) {
//     console.log("Successfully obtained campsite info:");
//     return _.pluck(jsres.resultset.result, '$');
//   })
//   .then(function (campsites) {
//     console.log("Fitered results: ", campsites)
//   })
//   .catch(function (err) {
//     console.log("Campsite fetch error:", err);
//   })
//   .catch(function (err) {
//     console.log("Campsite XML parse error:", err);
//   })

db.regenerateDb();
