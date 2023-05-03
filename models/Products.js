const db = require('../models/db');

class Products {
  static getAll(callback) {
    db.query('SELECT * FROM products', (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }
}

module.exports = Products;
