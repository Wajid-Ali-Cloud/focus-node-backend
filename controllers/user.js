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
    profileImage: "http://18.212.22.154:5001/" + req.file.path.toString(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    zipCode: req.body.zipCode,
    about: req.body.about,
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
          message: "User account successfully created!",
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

const userLogin = async (req, res) => {
  try {
    await userModel
      .findOne({ email: req.body.email })
      .then((user) => {
        console.log("user----> ", user);

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

const userUpdate = async (req, res) => {
  if (
    !req.body.profileImage ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phoneNumber ||
    !req.body.address ||
    !req.body.country ||
    !req.body.state ||
    !req.body.city ||
    !req.body.zipCode ||
    !req.body.about ||
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
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "User not found with id " + req.params.id,
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
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating user with id " + req.params.id,
      });
    });
};

const userChangePassword = async (req, res) => {
  if (!req.body.password) {
    return res.status(400).send({
      success: false,
      message: "Please enter password",
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
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "User not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        message: "New password has been created",
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating user with id " + req.params.id,
      });
    });
};

module.exports = {
  getUsers,
  userRegister,
  userLogin,
  userUpdate,
  userChangePassword,
};
