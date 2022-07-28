const router = require("express").Router();

const multer = require("multer");

const {
  getAllProducts,
  getProduct,
  getProductByName,
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

router.get("/getAllProduct", getAllProducts);
router.get("/getAllProduct/:id", getProduct);
router.get("/getAllProduct/title", getProductByName);
router.post("/addProduct", upload.single("productImage"), addProduct);
router.put("/updateProduct/:id", upload.single("productImage"), updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
