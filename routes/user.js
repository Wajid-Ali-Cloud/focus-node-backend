const router = require("express").Router();
const {
  getUsers,
  userRegister,
  userLogin,
  userUpdate,
  userChangePassword,
} = require("../controllers/user");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/user-profile-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/getAllUser", getUsers);
router.post("/userRegister", upload.single("profileImage"), userRegister);
router.post("/userLogin", upload.none(), userLogin);
router.put("/userUpdate/:id", upload.single("profileImage"), userUpdate);
router.put("/userUpdate/:id", upload.none(), userChangePassword);
module.exports = router;
