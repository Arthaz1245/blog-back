const express = require("express");
const router = express.Router();
const users = require("./UserRoute");
const posts = require("./PostRoute");
router.use("/users", users);
router.use("/posts", posts);
module.exports = router;
