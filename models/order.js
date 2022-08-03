const mongoose = require("mongoose");

const OrderScheema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    subTotal: { type: Number, require: [true, "Sub Total is required"] },
    deliveryCharges: {
      type: Number,
      require: [true, "Delivery charges is required"],
    },
    totalAmount: { type: Number, require: [true, "Total amount is required"] },
    quantity: { type: Number, default: 1 },
    firstName: { type: String, require: [true, "First Name is required"] },
    lastName: { type: String, require: [true, "Last Name is required"] },
    email: { type: String, require: [true, "Email is required"] },
    phoneNumber: { type: String, require: [true, "Phone Number is required"] },
    address: { type: String, require: [true, "Address is required"] },
    city: { type: String, require: [true, "City is required"] },
    state: { type: String, require: [true, "State is required"] },
    Zip: { type: String, require: [true, "Zip is required"] },
    country: { type: String, require: [true, "Country is required"] },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderScheema);
module.exports = Order;
