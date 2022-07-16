const router = require("express").Router();

const multer = require("multer");

const upload = multer();

const {
  getContactForm,
  sendContactForm,
} = require("../controllers/contactForm");

router.post("/sendContactForm", upload.none(), sendContactForm);
router.get("/getContactForm", getContactForm);

module.exports = router;
