const SQL_HOST = process.env.SQL_HOST;
const SQL_PORT = process.env.SQL_PORT;
const SQL_USER = process.env.SQL_USER;
const SQL_PW = process.env.SQL_PW;
const SQL_DB = process.env.SQL_DB;


const mysql = require('mysql')
const connection = mysql.createConnection({
  host: SQL_HOST,
  port: SQL_PORT,
  user: SQL_USER,
  password: SQL_PW,
  database: SQL_DB
})

module.exports = connection;