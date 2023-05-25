const bcrypt = require("bcrypt");
const User = require("../models/User");

const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(
    {
      _id,
    },
    jwtKey,
    { expiresIn: "3d" }
  );
};
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return res.status(400).json("User already exist");
    if (!name || !email || !password)
      return res.status(400).json("All fields are required");
    if (!validator.isEmail(email)) {
      return res.status(400).json("The password is not strong enought");
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json("The password is not strong enought");
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = {
  register,
};
