const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema(
  {
    productImage: {
      type: String,
      require: [true, "product Image is required"],
    },
    title: {
      type: String,
      require: [true, "product name is required"],
    },
    description: {
      type: String,
      require: [true, "product description is required"],
    },
    regularPrice: {
      type: Number,
      require: [true, "product price is required"],
    },
    salePrice: {
      type: Number,
      require: [true, "product price is required"],
    },
    color: {
      type: String,
      require: [true, "product color is required"],
    },
    size: {
      type: String,
      require: [true, "product feature is required"],
    },
    category: {
      type: Object,
      require: [true, "product category is required"],
    },
    feature: {
      type: String,
      require: [true, "product feature is required"],
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", ProductsSchema);
module.exports = Products;
