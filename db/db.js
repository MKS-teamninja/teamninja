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
var _ = require('underscore');

module.exports = knex;

knex.ensureSchema = ensureSchema = function () {
  return Promise.all([
    knex.schema.hasTable('campgrounds').then(function (exists) {
      if (!exists) {
        knex.schema.createTable('campgrounds', function (table) {
          table.increments('campground_id').primary();
          table.string('contract_id', 255);
          table.string('contract_type', 255);
          table.integer('facility_id');
          table.string('facility_name', 255);
          table.string('facility_photo_url', 255);
          table.string('latitude', 255);
          table.string('longitude', 255);
          table.string('waterfront', 255);
          table.boolean('water');
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
          table.string('trail_name', 255);
          table.integer('max_eq_length');
          table.integer('max_people');
          table.integer('campground_id_fk');
          table.integer('site_id');
          table.string('site_name', 255);
          table.string('site_type', 255);
          table.string('waterfront', 255);
          table.boolean('water');
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

knex.deleteEverything = function () {
  return knex('campsites').truncate()
    .then(function () {
      return knex('campgrounds').truncate()
    })
    .then(function () {
      console.log("Deleted campgrounds and campsites db tables")
    })
}

//
// Select all campgrounds from the campgrounds table
//
knex.queryCampgrounds = function() {
  return knex('campgrounds').select();
};

//
// Select all campsites with the given campground ID
//
knex.queryCampsites = function(cg_id) {
  return knex('campsites').where({'campground_id_fk': cg_id}).select();
}

//
// Insert all elements of a campground/campsite array into the given table name
//
knex.insertEverything = function(campArr, table) {
  return Promise.all(_.map(campArr, function(camp) {
    return knex(table).insert(camp)
      .then(function (res) {
        console.log("Added entry to " + table + " table: ", res);
      })
      .catch(function (err) {
        console.log("Error inserting into " + table + " table: ", err);
      })
  })).then(function() {
    return campArr;
  });
}

knex.closeDb = function () {
  knex.destroy().then(function () {
    console.log("Closed db connection")
  })
}
