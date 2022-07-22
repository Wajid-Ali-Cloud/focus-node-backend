const router = require("express").Router();

const multer = require("multer");

const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/product-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/getAllProducts", getAllProducts);
router.get("/getAllProducts/:id", getProduct);
router.post("/addProduct", upload.single("productImage"), addProduct);
router.put("/updateProduct/:id", upload.single("productImage"), updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
