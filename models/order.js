const mongoose = require("mongoose");

const OrderScheema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderScheema);
module.exports = Order;
