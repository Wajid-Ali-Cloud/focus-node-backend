const router = require("express").Router();

const multer = require("multer");

// const upload = multer();

const {
  getComments,
  addComments,
  deleteComments,
} = require("../controllers/comments");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/commentsimages");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/getComments", getComments);
router.post("/addComments", upload.single("commentsImage"), addComments);
// router.put(
//   "/updateComments/:id",
//   upload.single("commentsImage"),
//   updateComments
// );
router.delete("/deleteComments/:id", deleteComments);

module.exports = router;
