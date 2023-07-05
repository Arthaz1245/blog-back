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
  searchPost,
  updatePost,
  deletePost,
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
router.get("/search", searchPost);
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedPost = await updatePost(id, data);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).send("Error to update the breed", error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await deletePost(id);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).send("Error to delete breed");
  }
});
module.exports = router;
