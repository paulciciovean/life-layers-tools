const productController = require("../controllers/productController.js");
const router = require("express").Router();
const { requireAuth } = require("../midlewares/requireAuth");

router.post("/new", productController.addProduct);

router.get("/all", productController.getAllProducts);

router.put("/:id", requireAuth, productController.updateProduct);

router.delete("/:id", requireAuth, productController.deleteProduct);

module.exports = router;
