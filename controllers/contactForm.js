const contactFormModel = require("../models/contactForm");

const nodemailer = require("nodemailer");

const getContactForm = async (req, res) => {
  contactFormModel
    .find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const sendContactForm = async (req, res) => {
  console.log("Contact Form ------->", req.body);
  let form = new contactFormModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  form
    .save()
    .then((data) => {
      return res.status(200).send({
        success: true,
        message: "Message successfully send",
        data: data,
      });
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "wajiddj421@gmail.com",
          pass: "112233qazwsx",
        },
      });

      let mailDetails = {
        from: "wajiddj421@gmail.com",
        to: "hmughal0123@gmail.com",
        subject: data.reason,
        // text: "Node.js testing mail for GeeksforGeeks",
        text: data,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("Email sent successfully");
        }
      });
    })
    .catch((err) => {
      return res.status(400).send({
        success: false,
        message: err.message || "Some error occurred while sending a message.",
      });
    });
};

module.exports = { getContactForm, sendContactForm };
