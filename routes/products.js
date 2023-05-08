const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

//!                CREATE ROUTERS

router.get("/listcategory", productsController.listcategory);
router.get("/listbrand", productsController.listbrand);
router.get("/listproducts", productsController.listproducts);

router.get("/search", productsController.search);
router.get("/category/:category", productsController.category);
router.get("/brand/:brand", productsController.brand);
router.get("/categorybrand/:category/:brand", productsController.categorybrand);

router.post("/addcategory", productsController.addcategory);
router.post("/addbrand", productsController.addbrand);
router.post("/addproduct", productsController.addproduct);
router.post("/buy/:id", productsController.buy);

router.put("/editcategory/:category_id", productsController.editcategory);
router.put("/editbrand/:brand_id", productsController.editbrand);
router.put("/editproduct/:product_id", productsController.editproduct);

router.delete("/categoryid/:id", productsController.deletecategoryid);
router.delete("/brandid/:id", productsController.deletebrandid);
router.delete("/productid/:id", productsController.deleteproductid);


module.exports = router;

