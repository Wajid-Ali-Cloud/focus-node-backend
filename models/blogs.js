const mongoose = require("mongoose");

const BlogsSchema = mongoose.Schema(
  {
    blogImage: {
      type: String,
      require: [true, "product Image is required"],
    },
    blogTitle: {
        type: String,
        require: [true, "product description is required"],
      },
    blogDescription: {
      type: String,
      require: [true, "product description is required"],
    },
    blogUserId: {
      type: String,
      require: [true, "product description is required"],
    },
    blogUserName: {
      type: String,
      require: [true, "product description is required"],
    },
    blogUserEmail: {
      type: String,
      require: [true, "product description is required"],
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("blogs", BlogsSchema);
module.exports = Blogs;
