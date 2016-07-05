
OffTheGrid Campground Finder

OffTheGrid is a campground search app that facilitates locating campground info from anywhere in the US (currently limited to only Texas). Whether you want to find campgrounds near your or near a specific location, this app will find them all and show you any relevant info you might need to help you get as far off the grid as you want.

Getting Started

Basic code flow:

In the backend, a worker queries Active.com's Campground and Campsite search APIs and filter/format/store all the relevant data on our backend using a SQLite3 database adapter through the Node.js KNEX library.

The front-end accepts user input (search location), geocodes this data using Google Maps Geocode API, and then sends the resulting latitude/longitude as well as search radius to the backend.

The backend web server then queries the database for all saved campgrounds retrieved by the worker. It then filters the campground list so that only the ones within the given search radius are returned.

Using this response info, the frontend displays the desirable data in a user-friendly list view, and also generates a map plotting the locations of the campground set. Users can toggle between campground list view and campsite list view if they want more details on individual campsites within a clicked campground.

Installing the codebase:

- Fork and clone down the codebase
- From within the code directory, perform NPM install (refer to package.json for all project dependencies)
- Launch server on localhost:4000, located in /server/index.js
- Connect to localhost:4000 in your browser

To regenerate the campground database:

- Currently, no process scheduler (crontab, etc) is set up to run cggrabber. You can run it manually or set up your desired process scheduler.
- To re-build the campgrounds and campsite database, simply run 'node worker/cggrabber.js'
- This will query the Campground/Campsite Search API and build the database. The database is re-built each time the worker is run (inserts rather than upserts).
- Note: Due to Active.com's query per second (QPS) limitation, the cggraber.js worker task is throttled to query no more than 2 times per second.

Running the tests

Since this project is still in early development stages, there isn't yet a test suite available. We intend to set Gulp to schedule tasks and automatically run tests using mocha, jshint, etc.

Built With

Node JS
SQLite3
Express
React JS
Bootstrap

Project management:

[![Stories in Ready](https://badge.waffle.io/MKS-teamninja/teamninja.png?label=ready&title=Ready)](http://waffle.io/MKS-teamninja/teamninja)

Project TODO:

Backend:

- Note: The backend is already feature complete. The only improvement necessary would be to schedule worker/cggrabber.js to run periodically using a process scheduler. Another important change would be to swap out the sqlite3 adapter currently configured in our knexfile to instead use postgreSQL. Since Heroku (our desired deployment environment) doesn't have a sqlite3 plugin, the DB must be switched to use postgres instead. None of the actual db build/query code should need to be changed.

Frontend:

- Add Map view to display a separate tab displaying a map of plotted campgrounds
- Add campsite view. This feature would potentially toggle a new view when a campground is clicked and display info for all campsites in that campground. This information is retrievable by querying the /searchcs endpoint on the backend and providing the campground ID.
- Display additional campground info in the list view, showing
  available amenities, waterfront (if availble), etc.
- Additional frontend styling for user-friendliness.

Cleanup:

- Break out app.js code into provided component files.
- Delete any deprecated, unused code.

API Reference:

  Backend APIs to collect campground and campsites

- Campground Search API:
  http://developer.active.com/docs/read/Campground_Search_API
- Campsite Search API:
- http://developer.active.com/docs/read/Campsite_Search_API

  Front-end APIs to geocode user input and map campgrounds

- Google Maps Geocoding API:
  https://developers.google.com/maps/documentation/geocoding/intro#Geocoding
- Google Maps Javascript API:
  https://developers.google.com/maps/documentation/javascript/3.exp/reference#experimental-version

Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.




https://github.com/Concatapult/node-catapult
