const router = require("express").Router();

// const multer = require("multer");

const {
  getAllOrder,
  createOrder,
  orderById,
  deleteOrder,
} = require("../controllers/order");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images/product-images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

router.get("/getAllOrders", getAllOrder);
router.get("/getAllOrders/:id", orderById);
router.post("/createOrder", createOrder);
router.delete("/deleteOrder/:id", deleteOrder);

module.exports = router;
