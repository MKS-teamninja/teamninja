//
// Campground grabber
//
// This worker queries the campground API once a day and upserts the campground database.
//
var cfg = require('../config');
var db = require('../db/db');
var rp = require('request-promise');
var xmlParse = require('xml2js').parseString;

var campgrounds = {
  uri: 'http://api.amp.active.com/camping/campgrounds?pstate=TX&siteType=2001',
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
  .then(function(res) {
    xmlParse(JSON.stringify(res));
    console.log("Successfully obtained campground info:", res);
  })
  .catch(function(err) {
    console.log("Campground fetch error:", err);
  });

rp(campsites)
  .then(function(res) {
    xmlParse(JSON.stringify(res));
    console.log("Successfully obtained campsite info:", res);
  })
  .catch(function(err) {
    console.log("Campsite fetch error:", err);
  });
