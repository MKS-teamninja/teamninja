//
// Campground grabber
//
// This worker queries the campground API once a day and upserts the campground database.
//
var cfg = require('../config');
var db = require('../db/db');
var request = require('request');

console.log("Hello worker!");

