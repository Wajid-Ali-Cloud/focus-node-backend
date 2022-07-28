const OrderModal = require("../models/order");
const ProductsModel = require("../models/products");
const mongoose = require("mongoose");

const getAllOrder = async (req, res) => {
  OrderModal.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then((orders) => {
      const response = {
        count: orders.length,
        orders: orders.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const createOrder = async (req, res) => {
  ProductsModel.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product Not found!",
        });
      }
      const order = new OrderModal({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: product,
      });
      return order.save();
    })
    .then((result) => {
      return res.status(201).json({
        status: true,
        message: "Order Placed",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const orderById = async (req, res) => {
  const id = req.params.id;
  OrderModal.findById(id)
    .select("product quantity _id")
    .exec()
    .then((order) => {
      if (!order) {
        res.status(404).json({
          status: false,
          message: "Order Not Found",
        });
      } else {
        res.status(200).json({
          status: true,
          order: order,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const deleteOrder = async (req, res) => {
  const id = req.query.id;

  console.log("id params ----->", req.params.id);
  OrderModal.deleteOne({ _id: id })
    .exec()
    .then((response) => {
      res.status(201).json({
        status: true,
        message: "Order Deleted",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

module.exports = {
  getAllOrder,
  createOrder,
  orderById,
  deleteOrder,
};
