const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
    },

    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 30,
      maxlength: 2000,
    },
    category: {
      type: Array,
      required: true,
    },
    image: {
      public_id: String,
      secure_url: String,
    },
    likes: {
      type: Array,
    },
    comments: { type: Array },
  },
  { versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
