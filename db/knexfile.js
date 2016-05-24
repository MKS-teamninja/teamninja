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
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '/cgdb_dev.sqlite')
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '/cgdb_test.sqlite')
    }
  }
};
