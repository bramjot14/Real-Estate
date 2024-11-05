const { Pool } = require('pg');

const pool = new Pool({
  user: 'real_estate_app_user',
  host: 'dpg-cskmm9t6l47c73blvse0-a',
  database: 'real_estate_app',
  password: 'sE0uq4H9kHCd1Q3zE6injaNrd1CdCzaU',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // For development; change this as needed for production
  },
});


module.exports = pool;
