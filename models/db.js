const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alignminds',
  database: 'warehouse_management'
});

//!             DATABASE CONNECTION

db.connect((err) => {
  if (err) {
 
    throw err;
  }
  console.log('Connected to database');
});
module.exports = db;
