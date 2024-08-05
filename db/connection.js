const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: "localhost",
  user: 'capyccom_santiago',
  password: '43997224Santi',
  database: 'capyccom_solsport',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;
