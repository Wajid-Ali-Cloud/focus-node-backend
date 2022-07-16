const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema(
  {
    productImage: {
      type: String,
      require: [true, "product image is Required"],
    },
    productName: {
      type: String,
      require: [true, "product name is required"],
    },
    productDescription: {
      type: String,
      require: [true, "product description is required"],
    },
    productPrice: {
      type: String,
      require: [true, "product price is required"],
    },
    productCategory: {
      type: String,
      require: [true, "product category is required"],
    },
    productColor: {
      type: String,
      require: [true, "product color is required"],
    },
    productFeature: {
      type: String,
      require: [true, "product feature is required"],
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", ProductsSchema);
module.exports = Products;
