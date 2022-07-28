const router = require("express").Router();

const multer = require("multer");

const {
  getAllComments,
  getcomment,
  updateComment,
  addComment,
  deleteComment,
} = require("../controllers/comments");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/comments-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/getAllComment", getAllComments);
router.get("/getAllComment/:id", getcomment);
router.post("/addComment", upload.single("commentsImage"), addComment);
router.put("/updateComment/:id", upload.single("commentsImage"), updateComment);
router.delete("/deleteComment/:id", deleteComment);

module.exports = router;
