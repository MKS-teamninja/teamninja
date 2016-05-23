//
// Campground grabber
//
// This worker queries the campground API once a day and upserts the campground database.
//
var cfg = require('../config');
var db = require('../db/db');
var rp = require('request-promise');
var xmlToJs = require('xml2js').parseString;
var promisedXmlToJs = function (xml) {
  return new Promise(function (resolve, reject) {
    xmlToJs(xml, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  })
};
// var cgstore = {};
// var csstore = {};
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
    console.log("Successfully queried campground API");
    return promisedXmlToJs(res);
  })
  .then(function (jsres) {
    console.log("Successfully obtained campground info:");
    console.log(JSON.stringify(jsres.resultset.result[0].$));
    return jsres;
  })
  .catch(function (err) {
    console.log("Campground fetch error:", err);
  })
  .catch(function (err) {
    console.log("XML parse error:", err);
  })


rp(campsites)
  .then(function (res) {
    return promisedXmlToJs(res);
  })
  .then(function (jsres) {
    console.log("Successfully obtained campsite info:");
    console.log(JSON.stringify(jsres.resultset.result[0].$));
    return jsres;
  })
  .catch(function (err) {
    console.log("Campsite fetch error:", err);
  })
  .catch(function (err) {
    console.log("XML parse error:", err);
  })

db.regenerateDb();


