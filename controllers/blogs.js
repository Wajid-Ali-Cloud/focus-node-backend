const BlogsModel = require("../models/blogs");

const getAllBlogs = async (req, res) => {
  BlogsModel.find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const getBlog = async (req, res, next) => {
  BlogsModel.findById({ _id: req.params.id })

    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Blog Not Found!",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

const addBlog = async (req, res) => {
  let blog = new BlogsModel({
    blogImage: "http://18.212.22.154:5001/" + req.file.path.toString(),
    blogTitle: req.body.blogTitle,
    blogDescription: req.body.blogDescription,
    blogUserId: req.body.blogUserId,
    blogUserName: req.body.blogUserName,
    blogUserEmail: req.body.blogUserEmail,
  });

  try {
    if (Object.keys(blog).length === 0) {
      res.send({
        success: false,
        message: "Invalid Request",
      });
      return;
    }
    blog
      .save()
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: "Blog successfully added",
          data: data,
        });
      })
      .catch((err) => {
        return res.status(400).send({
          success: false,
          message: err.message || "Some error occurred while adding Blog.",
        });
      });
  } catch (error) {
    console.log("Error", error);
  }
};

const updateBlog = async (req, res) => {
  if (
    !req.body.blogImage ||
    !req.body.blogTitle ||
    !req.body.blogDescription ||
    !req.body.blogUserId ||
    !req.body.blogUserName ||
    !req.body.blogUserEmail
  ) {
    return res.status(400).send({
      success: false,
      message: "Please enter User name and email",
    });
  }

  BlogsModel.findByIdAndUpdate(
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
          message: "Blog not found with id " + req.params.id,
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
          message: "Blog not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating blog with id " + req.params.id,
      });
    });
};

const deleteBlog = async (req, res) => {
  BlogsModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Blog not found with id " + req.params.id,
        });
      }
      res.json({
        success: true,
        message: "Blog successfully deleted!",
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "Blog not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete blog with id " + req.params.id,
      });
    });
};

module.exports = {
  getAllBlogs,
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
};
