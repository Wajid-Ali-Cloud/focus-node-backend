const router = require("express").Router();
const {
  getAllBlogs,
  getBlog,
  getBlogByName,
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

router.get("/getAllBlog", getAllBlogs);
router.get("/getAllBlog/:id", getBlog);
router.get("/getAllBlog/title", getBlogByName);
router.post("/addBlog", upload.single("blogImage"), addBlog);
router.put("/updateBlog/:id", upload.single("blogImage"), updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = router;
