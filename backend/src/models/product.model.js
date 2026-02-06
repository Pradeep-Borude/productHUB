const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  description: String,

  image: String,

  imageFileId: String,

  company: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  featured: {
    type: Boolean,
    default: false
  },

  rating: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
