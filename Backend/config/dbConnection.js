const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const { Pool } = require('pg');

const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
});
console.log("db connected succesfully");

module.exports = pool;