const router = require("express").Router();

const multer = require("multer");

const upload = multer();

const {
  getUsers,
  userRegister,
  userLogin,
  userUpdate,
} = require("../controllers/user");

router.get("/getUsers", getUsers);
router.post("/userRegister", upload.none(), userRegister);
router.post("/userLogin", upload.none(), userLogin);
router.put("/userUpdate/:id", upload.none(), userUpdate);
module.exports = router;
