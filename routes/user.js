const router = require("express").Router();

const multer = require("multer");

const upload = multer();

const { getUsers, userRegister, loginUser, updateUser } = require("../controllers/user");

router.get("/getUsers", getUsers);
router.post("/userRegister", upload.none(), userRegister);
router.post("/loginUser", upload.none(), loginUser);
router.put("/updateUser/:id", upload.none(), updateUser)

module.exports = router;
