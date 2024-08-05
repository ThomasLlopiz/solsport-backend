const mysql = require("mysql2");
// require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOSTDB || "localhost",
  user: process.env.USERDB || "root",
  database: process.env.DB || "solsport",
  password: process.env.PASSWORDDB || "",
  port: process.env.PORTDB || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;
