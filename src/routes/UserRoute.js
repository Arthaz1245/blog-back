const express = require("express");
const { register } = require("../controllers/RegisterController");
const { signing } = require("../controllers/LoginController");
const { findUser, findAllUsers } = require("../controllers/UserController");
const router = express.Router();
router.post("/register", register);
router.post("/login", signing);
router.get("/find/:userId", findUser);
router.get("/", findAllUsers);
module.exports = router;
