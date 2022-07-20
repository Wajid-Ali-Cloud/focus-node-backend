const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
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
    userRole: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
