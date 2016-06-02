//
// Index.js
//
// Client-facing server code for Campground Query app
// Run "nodemon server/index.js" to start on localhost:4000
//
// Routes:
//
// GET /searchcg
//   - Queries all campgrounds within a given range
//   - Client should include user's latitude, longitude, and radius (in miles)
//   - Example URL: http://localhost:4000/searchcg?lat=30.48276099999998&lon=-97.6564032&rad=30
//
// GET /searchcs
//   - Returns all campsites within a given campground
//   - Client should include campground ID as a request parameter named cgId
//   - Example URL: http://localhost:4000/searchcs?cgId=820400
//

var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
var helpers = require('./helpers');
var xmlParse = require('xml2js').parseString;
var db = require('../db/db');


var routes = express.Router()

//
// Provide a browserified file at a specified path
//
routes.get('/app-bundle.js',
  browserify('./client/components/app.js', {
    transform: [ require('reactify') ]
  }))

//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))



//
// Campground query route
// Returns all campgrounds within the given radius
// Client should include user's latitude, longitude, and radius (in miles)
// as request parameters named lat, lon, rad
// Example URL:
//   http://localhost:4000/searchcg?lat=30.48276099999998&lon=-97.6564032&rad=30
//
routes.get('/searchcg', function (req, res) {
  // console.log("Request lat: ", req.query.lat);
  // console.log("Request lon: ", req.query.lon);
  // console.log("Request rad: ", req.query.rad);
  db.queryCampgrounds()
    .then(function(cgs) {
      var filtered = helpers.cgFilter(cgs, req.query.lat, req.query.lon, req.query.rad);
      // console.log("Filtered campground set: ", filtered);
      res.status(200).send(filtered);
  })
})

//
// Campsite query route:
// Returns all campsites within a given campground
// Client should include campground ID as a request parameter named cgId
// Example URL:
//   http://localhost:4000/searchcs?cgId=820400
//
routes.get('/searchcs', function (req, res) {
  // console.log("Requested campground ID: ", req.query.cgId);
  db.queryCampsites(req.query.cgId)
    .then(function(cs) {
      // console.log("Campsites in campground #" + req.query.cgId + ": ", cs);
      return cs.sort(function(a,b){
        return a.campsite_id - b.campsite_id
      })
    })
    .then(function(cs){
      return res.status(200).send(cs)
    })
})

if (process.env.NODE_ENV === 'test'){
  //export route for testing
  module.exports = routes
}else{
  // in dev and production environment, keep on setting up the app
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })
  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express()
  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() )

  // Mount our main router
  app.use('/', routes)

  // Start the server!
  var port = process.env.PORT || 4000
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var counter = 0;
  io.on('connection', function(socket) {
    counter++;
    io.emit('connected', counter);
    socket.on('disconnect', function() {
      counter--;
      io.emit('connected', counter);
    })
    socket.on('clickedCampground', function(campground){
      broadcastLastCampsite(campground.facility_name)
    });
    socket.on('askConnectionNumber', function(){
      socket.emit('returnConnectionNumber', counter)
    })
  });


  var broadcastLastCampsite = function(campsite){
    io.sockets.emit("lastViewed", campsite)
  }



  http.listen(port)
  console.log("Listening on port", port)
}