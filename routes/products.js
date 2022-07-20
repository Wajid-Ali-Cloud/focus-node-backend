const router = require("express").Router();
const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/products");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/product-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/getProducts", getProducts);
router.post("/addProducts", upload.single("productImage"), addProducts);
router.put("/updateProducts", upload.single("productImage"), updateProducts);
router.delete("/deleteProducts/:id", deleteProducts);

module.exports = router;
