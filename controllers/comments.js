const CommentsModel = require("../models/comments");

const getAllComments = async (req, res) => {
  CommentsModel.find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const getcomment = async (req, res, next) => {
  CommentsModel.findById({ _id: req.params.id })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Comment Not Found!",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

const addComment = async (req, res) => {
  let comment = new CommentsModel({
    commentsImage: req.file.path.toString(),
    commentsDescription: req.body.commentsDescription,
    commentsFullName: req.body.commentsFullName,
    commentsEmail: req.body.commentsEmail,
    commentsSubject: req.body.commentsSubject,
  });

  try {
    const userExists = await CommentsModel.findOne({
      commentsEmail: req.body.commentsEmail,
    });
    if (userExists) {
      res.status(400).json("Email already exist");
    }
    if (Object.keys(comment).length === 0) {
      res.send({
        success: false,
        message: "Invalid Request",
      });
      return;
    }
    comment
      .save()
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: "comment successfully added",
          data: data,
        });
      })
      .catch((err) => {
        return res.status(400).send({
          success: false,
          message: err.message || "Some error occurred while sending comment.",
        });
      });
  } catch (error) {
    console.log("Error", error);
  }
};

const updateComment = async (req, res) => {
  if (
    !req.body.commentsImage ||
    !req.body.commentsDescription ||
    !req.body.commentsFullName ||
    !req.body.commentsEmail ||
    !req.body.commentsSubject
  ) {
    return res.status(400).send({
      success: false,
      message: "Please enter Full Name and Email",
    });
  }

  CommentsModel.findByIdAndUpdate(
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
          message: "Comment not found with id " + req.params.id,
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
          message: "Comment not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating comment with id " + req.params.id,
      });
    });
};

const deleteComment = async (req, res) => {
  CommentsModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "comment not found with id " + req.params.id,
        });
      }
      res.json({
        success: true,
        message: "comment successfully deleted!",
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "comment not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete comment with id " + req.params.id,
      });
    });
};

module.exports = {
  getAllComments,
  getcomment,
  addComment,
  updateComment,
  deleteComment,
};
