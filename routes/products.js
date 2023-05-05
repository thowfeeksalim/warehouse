const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

//!                CREATE ROUTERS

router.get("/", productsController.getAllProducts);
router.get("/search", productsController.search);
router.get("/category/:category", productsController.category);

router.post("/add", productsController.create);
router.post("/buy/:id", productsController.buy);

router.delete("/:id",productsController.delete);




module.exports = router;