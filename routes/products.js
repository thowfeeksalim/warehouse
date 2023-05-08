const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

//!                CREATE ROUTERS

router.get("/", productsController.getAllProducts);
router.get("/search", productsController.search);
router.get("/category/:category", productsController.category);
router.get("/brand/:brand", productsController.brand);
router.get("/categorybrand/:category/:brand", productsController.categorybrand);

router.post("/addcategory", productsController.addcategory);
router.post("/addbrand", productsController.addbrand);
router.post("/addproduct", productsController.addproduct);
router.post("/buy/:id", productsController.buy);

router.put("/edit/:product_id", productsController.edit);

router.delete("/:id", productsController.delete);

module.exports = router;

