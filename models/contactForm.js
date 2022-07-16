const mongoose = require("mongoose");

const ContactFormSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "Please enter your First Name"],
    },
    lastName: {
      type: String,
      require: [true, "Please enter your Last Name"],
    },
    email: {
      type: String,
      require: [true, "Please enter your Email"],
    },
    subject: {
      type: String,
      require: [true, "please enter your Subject"],
    },
    message: {
      type: String,
      require: [true, "Please enter your Message"],
    },
  },
  { timestamps: true }
);

const ContactForm = mongoose.model("Contact Form", ContactFormSchema);
module.exports = ContactForm;
