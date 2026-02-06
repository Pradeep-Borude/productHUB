const express = require("express");
const multer = require("multer");
const productController = require("../controllers/product.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

router.post(
  "/",
  authUserMiddleware,
  upload.single("file"),
  productController.createproduct
);

router.put(
  "/:productId",
  authUserMiddleware,
  upload.single("file"),
  productController.updateproduct
);

router.delete(
  "/:productId",
  authUserMiddleware,
  productController.deleteproduct
);

router.get("/", productController.getproductItems);


module.exports = router;
