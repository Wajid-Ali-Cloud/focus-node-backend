const CommentModel = require("../models/comments");

const getComments = async (req, res) => {
  CommentModel.find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const addComments = async (req, res) => {
  let comments = new CommentModel({
    commentsImage: req.file.path.toString(),
    commentsForm: req.body.commentsForm,
    commentsFullName: req.body.commentsFullName,
    commentsEmail: req.body.commentsEmail,
    commentsSubject: req.body.commentsSubject,
  });

  try {
    if (Object.keys(comments).length === 0) {
      res.send({
        success: false,
        message: "Invalid Request",
      });
      return;
    }
    comments
      .save()
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: "comment successfully send",
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

// const updateComments = async (req, res) => {
//   if (
//     !req.body.commentsImage ||
//     !req.body.commentsForm ||
//     !req.body.commentsFullName ||
//     !req.body.commentsEmail ||
//     !req.body.commentsSubject
//   ) {
//     return res.status(400).send({
//       success: false,
//       message: "Comments data not found",
//     });
//   }
//   CommentModel
//     .findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     )
//     .then((data) => {
//       if (!data) {
//         return res.status(404).send({
//           success: false,
//           message: "Comments not found with id " + req.params.id,
//         });
//       }
//       res.send({
//         success: true,
//         data: data,
//       });
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           success: false,
//           message: "Comments not found with id " + req.params.id,
//         });
//       }
//       return res.status(500).send({
//         success: false,
//         message: "Error updating comments with id " + req.params.id,
//       });
//     });
// };

const deleteComments = async (req, res) => {
  console.log("id ----->", req.params.id);
  CommentModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "comments not found with id " + req.params.id,
        });
      }
      res.json({
        success: true,
        message: "comments successfully deleted!",
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "comments not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete comments with id " + req.params.id,
      });
    });
};

module.exports = { getComments, addComments, deleteComments };
