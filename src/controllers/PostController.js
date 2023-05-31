const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs-extra");
const { uploadImage } = require("../utils/Cloudinary");

const createPost = async (req, res) => {
  try {
    const { title, author, content, category } = req.body;
    // const user = await User.findById(author);
    // if (user) {
    const post = new Post({
      title,
      author,
      content,
      category,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      post.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    await post.save();

    res.json(post);
    // } else {
    //   return res.status(400).json("The author must be a register user");
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = Post.find();
    if (!posts) return res.status(400).json("There are not posts");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getPostById = (req, res) => {
  const { id } = req.params;
  try {
    const post = Post.findById(id);
    if (!post) return res.status(400).json("This post does not exist");
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
