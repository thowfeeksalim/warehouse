const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'warehouse_management'
});

db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Connected to database');
});
module.exports = db;
