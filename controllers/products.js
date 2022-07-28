const ProductsModel = require("../models/products");

const getAllProducts = async (req, res) => {
  ProductsModel.find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const getProduct = async (req, res, next) => {
  ProductsModel.findById({ _id: req.params.id })
    // .select("_id name price productImage category")
    // .populate("category")
    // .exec()
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Product Not Found!",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

const getProductByName = async (req, res, next) => {
  ProductsModel.findOne({ title: req.params.title })
    // .select("_id name price productImage category")
    // .populate("category")
    // .exec()
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Product Not Found!",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

const addProduct = async (req, res) => {
  console.log("req body -------->", req?.body);
  let product = new ProductsModel({
    productImage: req.file.path.toString(),
    title: req.body.title,
    description: req.body.description,
    regularPrice: req.body.regularPrice,
    salePrice: req.body.salePrice,
    color: req.body.color,
    size: req.body.size,
    color: req.body.color,
    category: req.body.category,
    feature: req.body.feature,
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
          message: "Products successfully added",
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

const updateProduct = async (req, res) => {
  if (
    !req.body.productImage ||
    !req.body.title ||
    !req.body.description ||
    !req.body.regularPrice ||
    !req.body.salePrice ||
    !req.body.color ||
    !req.body.size ||
    !req.body.color ||
    !req.body.category ||
    !req.body.feature
  ) {
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

const deleteProduct = async (req, res) => {
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

module.exports = {
  getAllProducts,
  getProduct,
  getProductByName,
  addProduct,
  updateProduct,
  deleteProduct,
};
