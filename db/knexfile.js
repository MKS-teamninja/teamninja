//
// knexfile.js
//
// Configures KNEX library to use SQLITE3 adapter and
// filepath of local database
//
//
var path = require('path');

module.exports = {

// TODO: Configure KNEX for SQLITE3 db

  development: {
    client: 'pg',
    connection: "postgres://campgrounds:campgrounds@localhost/campgrounds"
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '/cgdb_test.sqlite')
    }
  }
};
