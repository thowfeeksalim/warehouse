const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

router.get('/', (req, res) => {
  Product.getAll((error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
