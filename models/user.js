const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    profileImage: {
      type: String,
    },
    firstName: {
      type: String,
      require: [true, "Please enter your first Name"],
    },
    lastName: {
      type: String,
      require: [true, "Please enter your last Name"],
    },
    email: {
      type: String,
      require: [true, "Please enter your Email"],
    },
    password: {
      type: String,
      require: [true, "please enter your Password"],
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    about: {
      type: String,
    },
    userRole: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
