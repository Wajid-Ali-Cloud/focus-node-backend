const router = require("express").Router();
const {
  getAllBlogs,
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/blog-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/getAllBlogs", getAllBlogs);
router.get("/getAllBlog/:id", getBlog);
router.post("/addblog", upload.single("blogImage"), addBlog);
router.put("/updateblog/:id", upload.single("blogImage"), updateBlog);
router.delete("/deleteblog/:id", deleteBlog);

module.exports = router;
