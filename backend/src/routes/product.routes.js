const express = require("express");
const multer = require("multer");
const productController = require("../controllers/product.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

router.post(
  "/add",
  authUserMiddleware,
  upload.single("file"),
  productController.createproduct
);

router.put(
  "/edit/:productId",
  authUserMiddleware,
  upload.single("file"),
  productController.updateproduct
);

router.delete(
  "/delete/:productId",
  authUserMiddleware,
  productController.deleteproduct
);

router.get("/", productController.getproductItems);

router.get("/my-products", authUserMiddleware, productController.getMyProducts);


module.exports = router;
