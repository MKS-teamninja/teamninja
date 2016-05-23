//
// db.js
//
// KNEX database library
// plus additional database helper functions
//
var path = require('path');

var config = require('./knexfile')
var env = process.env.NODE_ENV || 'development'
var knex = require('knex')(config[env])

module.exports = knex;

knex.ensureSchema = ensureSchema = function () {
  return Promise.all([
    knex.schema.hasTable('campgrounds').then(function (exists) {
      if (!exists) {
        knex.schema.createTable('campgrounds', function (table) {
          table.increments('campground_id').primary();
          table.integer('facility_id');
          table.string('facility_name', 255);
          table.string('facility_photo_url', 255);
          table.string('latitude', 255);
          table.string('longitude', 255);
          table.string('waterfront', 255);
          table.boolean('amps');
          table.boolean('pets');
          table.boolean('sewer');
          // table.timestamps();
        }).then(function (table) {
          console.log('Created campgrounds table.');
        })
      }
    }),

    knex.schema.hasTable('campsites').then(function (exists) {
      if (!exists) {
        knex.schema.createTable('campsites', function (table) {
          table.increments('campsite_id').primary();
          table.integer('campground_id_fk');
          table.integer('site_id');
          table.string('site_name', 255);
          table.string('site_type', 255);
          table.string('waterfront', 255);
          table.string('water', 255);
          table.boolean('amps');
          table.boolean('pets');
          table.boolean('sewer');
          // table.timestamps();
        }).then(function (table) {
          console.log('Created campsites table.');
        });
      }
    })
  ])
}

knex.deleteEverything = deleteEverything = function () {
  return knex('campsites').truncate()
    .then(function () {
      // return knex('campgrounds').truncate()
      return knex('campgrounds').truncate()
    })
    .then(function () {
      console.log("Deleted campgrounds and campsites db tables")
    })
}

knex.regenerateDb = function () {
  deleteEverything().then(function () {
    console.log("Deleted everything first...");
    return ensureSchema();
  }).then(function () {
    console.log("Created campground/campsite tables");
    knex.destroy()
  }).then(function () {
    console.log("Successfully closed pool connection")
  })
}
