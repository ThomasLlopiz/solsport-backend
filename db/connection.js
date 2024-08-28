const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.HOSTDB,
  user: process.env.USERDB,
  database: process.env.DB,
  password: process.env.PASSWORDDB,
  port: process.env.PORTDB,
});
//mysql://root:NyHSfAclCKywCDkzBOMsFXktXJONTDdL@roundhouse.proxy.rlwy.net:13122/railway
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;
