const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  likePost,
  unlikePost,
} = require("../controllers/PostController");

router.post(
  "/",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createPost
);
router.get("/:id", getPostById);
router.get("/", getAllPosts);
router.get("/myposts/:userId", getPostsByUser);
router.put("/likePost", likePost);
router.put("/unlikePost", unlikePost);
module.exports = router;
