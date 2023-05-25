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
      console.log(req.files);
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
module.exports = {
  createPost,
};
