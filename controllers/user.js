const userModel = require("../models/user");

const getUsers = async (req, res) => {
  userModel
    .find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const userRegister = async (req, res) => {
  let user = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    userRole: req.body.userRole,
  });

  try {
    const userExists = await userModel.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).json("Email already exist");
    }
    if (Object.keys(user).length === 0) {
      res.send({
        success: false,
        message: "Invalid Request",
      });
      return;
    }
    user
      .save()
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: "Message successfully send",
          data: data,
        });
      })
      .catch((err) => {
        return res.status(400).send({
          success: false,
          message:
            err.message || "Some error occurred while sending a message.",
        });
      });
  } catch (error) {
    console.log("Error", error);
  }
};

const loginUser = async (req, res) => {
  try {
    await userModel
      .findOne({ email: req.body.email })
      .then((user) => {
        if (req.body.password === user.password) {
          return res.status(200).json({ success: true, user });
        } else {
          return res.status(400).json("Password Invalid");
        }
      })
      .catch((err) => {
        return res.status(400).json("Invalid credentials");
      });
  } catch (error) {
    console.log("Error", error);
  }
};

const updateUser = async (req, res) => {
    console.log("console---------->", req.params.id)
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.userRole
  ) {
    return res.status(400).send({
      success: false,
      message: "Please enter email name and password",
    });
  }
  userModel
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    .then((data) => {
      console.log("prams id --------->", req?.params?.id )
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Product not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating product with id " + req.params.id,
      });
    });
};

module.exports = { getUsers, userRegister, loginUser, updateUser };
