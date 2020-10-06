const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
    },
    body: {
      type: String,
      required: [true, "Blog body is required"],
    },
    authorId: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Blog image is required"],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
