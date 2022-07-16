const ProductsModel = require("../models/products");

const getProducts = async (req, res) => {
  ProductsModel.find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const addProducts = async (req, res) => {
  let product = new ProductsModel({
    productImage: req.file.path.toString(),
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    productCategory: req.body.productCategory,
    productColor: req.body.productColor,
    productFeature: req.body.productFeature,
  });

  try {
    if (Object.keys(product).length === 0) {
      res.send({
        success: false,
        message: "Invalid Request",
      });
      return;
    }
    product
      .save()
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: "Products successfully send",
          data: data,
        });
      })
      .catch((err) => {
        return res.status(400).send({
          success: false,
          message: err.message || "Some error occurred while sending Products.",
        });
      });
  } catch (error) {
    console.log("Error", error);
  }
};

const updateProducts = async (req, res) => {
  if (!req.body.productName || !req.body.productPrice) {
    return res.status(400).send({
      success: false,
      message: "Please enter product name and price",
    });
  }

  ProductsModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating product with id " + req.params.id,
      });
    });
};

const deleteProducts = async (req, res) => {
  console.log("id ----->", req.params.id);
  ProductsModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id,
        });
      }
      res.json({
        success: true,
        message: "Product successfully deleted!",
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete product with id " + req.params.id,
      });
    });
};

module.exports = { getProducts, addProducts, updateProducts, deleteProducts };
