const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

router.get("/", productsController.getAllProducts);
router.post("/add", productsController.create);
router.get("/category/:category", productsController.category);
router.post("/buy/:id", productsController.buy);
router.get("/search", productsController.search);



module.exports = router;