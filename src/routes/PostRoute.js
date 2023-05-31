const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
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
module.exports = router;
