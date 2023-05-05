const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

router.get("/", productsController.getAllProducts);
router.get("/category/:category", productsController.category);
router.get("/search", productsController.search);
router.post("/add", productsController.create);


module.exports = router;