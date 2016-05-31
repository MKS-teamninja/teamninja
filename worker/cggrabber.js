//
// cggrabber.js
//
// Campground grabber queries the campground API
// and regenerates the campground database.
//
var cfg = require('../config');
var db = require('../db/db');
var _ = require('underscore');
var camp = require('./cghelpers');
var PromiseThrottle = require('promise-throttle');

//
// PromisedThrottle will ensure we don't exceed 2 queries per second
//
var pthrottle = new PromiseThrottle({
  requestsPerSecond: 2,
  promiseImplementation: Promise
});

//
// Base string used to query campsites of a specific campground
//
var campsitesUrl = 'http://api.amp.active.com/camping/campsites?';

//
// Main worker function collects campground and campsite info
// then stores them in the database
//
var worker = function() {
  db.deleteEverything();
  db.ensureSchema()
    .then(function () {
      console.log("Regenerated campground and campsite tables");
      return collectCampgrounds();
    })
    .then(function(cgs) {
      // var testCgs = Array.prototype.slice(cgs, 0, 2);
      console.log("Collected campgrounds");
      return collectCampsites(cgs)
    })
    .then(function () {
      console.log("Collected campsites");
      db.closeDb();
    })
    .catch(function (err) {
      console.log("Worker failed: ", err);
    })
}()

//
// Fetches a scrubbed array of campgrounds and
// inserts them into the campgrounds table
//
var collectCampgrounds = function() {
  //
  // Query info for Active's Campground Search API
  //
  var campgrounds = {
    uri: 'http://api.amp.active.com/camping/campgrounds?pstate=TX',
    qs: {
      api_key: process.env.getCgApiKey || cfg.getCgApiKey()
    },
    headers: {
      'User-Agent': 'request-promise'
    },
    json: true
  };

  return camp.fetch(campgrounds)
    .then(function (cgs) {
      console.log("Cleaned results: ", cgs)
      //
      // Insert campground data into db
      //
      return db.insertEverything(cgs, 'campgrounds');
    })
}

//
// Fetches a scrubbed array of campsites for each campground and
// inserts them into the campsites table. Queries are throttled
// to 2 per second as per Active API's QPS limit.
//
var collectCampsites = function(cgs) {
  return Promise.all(_.map(cgs, function(cg) {
    return pthrottle.add(queryCampsites.bind(this, cg))
    .then(function() {
      console.log("Campground queried");
    })
  }))
  .then(function() {
    console.log("All campgrounds queried");
  })
}

//
// Query an individual campground for its campsites
//
var queryCampsites = function(cg) {
  //
  // Query info for Active's Campsite Search API
  //
  var campsite = {
    uri: campsitesUrl,
    qs: {
      api_key: cfg.getCgApiKey()
    },
    headers: {
      'User-Agent': 'request-promise'
    },
    json: true
  };

  var csQuery = _.extend({}, campsite);
  csQuery.uri += 'contractCode=' +
                 cg.contract_id +
                 '&parkId=' +
                 cg.facility_id;

  return camp.fetch(csQuery, cg.facility_id)
    .then(function (campsites) {
      return db.insertEverything(campsites, 'campsites')
    })
}
