const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const { createPost } = require("../controllers/PostController");

router.post(
  "/",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createPost
);
module.exports = router;
