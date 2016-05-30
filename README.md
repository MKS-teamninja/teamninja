
OffTheGrid Campground Finder
(MKS36 Team Ninja Greenfield Project)

OffTheGrid is a campground search app that facilitates locating campground info from anywhere in the US (though currently only Texas). Whether you want to find campgrounds near your or near a specific location, this app will find them all and show you any relevant info you might need to help you get as far off the grid as you want.

Getting Started

Basic code flow:

We query Active.com's Campground and Campsite search APIs and filter/format/store all the relevant data on our backend using a SQLite3 database adapter through the Node.js KNEX library.

The front-end accepts user input (search location), geocodes this data using Google Maps Geocode API, and then sends the resulting latitude/longitude as well as search radius to the backend.

The backend then queries the database for all saved campgrounds retrieved by the worker. It then filters the campground list so that only the ones within the given search radius are returned.

Using this response info, the frontend displays the desirable data in a user-friendly list view, as well as generates a map plotting the locations of these campgrounds.

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
Express
React JS
SQLite3


Project management:

[![Stories in Ready](https://badge.waffle.io/MKS-teamninja/teamninja.png?label=ready&title=Ready)](http://waffle.io/MKS-teamninja/teamninja)

Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

Original Authors

Mark Boraski (Product Owner) - https://github.com/orgs/MKS-teamninja/people/SpartanSOS

Maher Dakkak (SCRUM Master) - https://github.com/Madakkak

Jack Hall - https://github.com/orgs/MKS-teamninja/people/jackjhall22

Matthew DuBose - https://github.com/orgs/MKS-teamninja/people/mjdubose

Vidush Rana - https://github.com/orgs/MKS-teamninja/people/Vidushr

Acknowledgments

Gilbert Garza for the React catapult project starter code!

https://github.com/Concatapult/node-catapult
