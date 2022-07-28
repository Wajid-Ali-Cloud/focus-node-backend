const mongoose = require("mongoose");

const commentFormSchema = mongoose.Schema(
  {
    commentsImage: {
      type: String,
      require: [true, "Image is required"],
    },
    commentsDescription: {
      type: String,
      require: [true, "Comment is required"],
    },
    commentsFullName: {
      type: String,
      require: [true, "Full Name is required"],
    },
    commentsEmail: {
      type: String,
      require: [true, "Email is required"],
    },
    commentsSubject: {
      type: String,
      require: [true, "Subject is required"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentFormSchema);
module.exports = Comment;
