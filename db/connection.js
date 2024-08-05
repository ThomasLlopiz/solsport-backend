const mysql = require("mysql");
// require('dotenv').config();

const db = mysql.createConnection({
  host: "localhost",
  user: "capyccom_santiago",
  password: "43997224Santi",
  database: "capyccom_solsport",
  port: process.env.PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;
