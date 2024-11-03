// db.js
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'real_estate_app',
    user: 'postgres',
    password: 'Chauhan@123'
});

module.exports = db;  // Export the db instance
