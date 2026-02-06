const productModel = require("../models/product.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createproduct(req, res) {
  try {
    let imageData = {};

    if (req.file) {
      const upload = await storageService.uploadFile(req.file.buffer, uuid());
      imageData = {
        image: upload.url,
        imageFileId: upload.fileId
      };
    }

    const product = await productModel.create({
      productId: req.body.productId,
      name: req.body.name,
      description: req.body.description,
      company: req.body.company,
      price: req.body.price,
      featured: req.body.featured,
      rating: req.body.rating,
      ...imageData
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateproduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await productModel.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.file) {
      if (product.imageFileId) {
        await storageService.deleteFile(product.imageFileId);
      }
      const upload = await storageService.uploadFile(req.file.buffer, uuid());
      product.image = upload.url;
      product.imageFileId = upload.fileId;
    }

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.featured = req.body.featured ?? product.featured;
    product.rating = req.body.rating ?? product.rating;
    product.company = req.body.company ?? product.company;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteproduct(req, res) {
  try {
    const { productId } = req.params;
    const product = await productModel.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.imageFileId) {
      await storageService.deleteFile(product.imageFileId);
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getproductItems(req, res) {
  try {
    const queryObject = {};

    if (req.query.featured) {
      queryObject.featured = req.query.featured === "true";
    }

    if (req.query.price_lt) {
      queryObject.price = { $lt: Number(req.query.price_lt) };
    }

    if (req.query.rating_gt) {
      queryObject.rating = { $gt: Number(req.query.rating_gt) };
    }

    const products = await productModel.find(queryObject);

    res.status(200).json({
      count: products.length,
      products
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}




module.exports = {
  createproduct,
  updateproduct,
  deleteproduct,
  getproductItems,
};
