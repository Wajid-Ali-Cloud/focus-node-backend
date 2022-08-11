const OrderModal = require("../models/order");
const ProductsModel = require("../models/products");
const mongoose = require("mongoose");

const getAllOrder = async (req, res) => {
  OrderModal.find()
    // .select("product quantity _id")
    // .populate("product", "name")
    .exec()
    .then((orders) => {
      return res
        .status(200)
        .json({ success: true, count: orders.length, orders });
    })
    // .then((orders) => {
    //   const response = {
    //     count: orders.length,
    //     orders: orders.map((data) => {
    //       return {
    //         _id: data._id,
    //         product: data.product,
    //         quantity: data.quantity,
    //         amount: data.amount,
    //         deliveryCharges: data.deliveryCharges,
    //         totalAmount: data.totalAmount,
    //         firstName: data.firstName,
    //         lastName: data.lastName,
    //         email: data.email,
    //         phoneNumber: data.phoneNumber,
    //         address: data.address,
    //         city: data.city,
    //         state: data.state,
    //         Zip: data.zip,
    //         country: data.country,
    //       };
    //     }),
    //   };
    //   res.status(200).json({ count: orders.length, orders });
    // })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const getOrder = async (req, res, next) => {
  OrderModal.findById({ _id: req.params.id })
    // .select("_id name price productImage category")
    // .populate("category")
    // .exec()
    .then((order) => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({
          message: "Product Not Found!",
        });
      }
    })
    .catch((error) => {
      next(error);
      res.status(500).json({ success: false, message: "Product Not Found!" });
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
        amount: req.body.amount,
        deliveryCharges: req.body.deliveryCharges,
        totalAmount: req.body.totalAmount,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        Zip: req.body.zip,
        country: req.body.country,
        product: product,
      });
      return order.save();
    })
    .then((order) => {
      return res.status(201).json({
        status: true,
        message: "Order Placed",
        createdOrder: order,
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
  console.log("id ------>", req.body.id);
  OrderModal.findByIdAndRemove(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          success: false,
          message: "Order not found with id " + req.params.id,
        });
      }
      res.json({
        success: true,
        message: "Order successfully deleted!",
        order: order,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "order not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete order with id " + req.params.id,
      });
    });
};

module.exports = {
  getAllOrder,
  getOrder,
  createOrder,
  orderById,
  deleteOrder,
};
