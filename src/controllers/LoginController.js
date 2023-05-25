const bcrypt = require("bcrypt");
const User = require("../models/User");
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
const signing = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json("Incorrect email or password");
    const isValidatorPassword = await bcrypt.compare(password, user.password);
    if (!isValidatorPassword)
      return res.status(400).json("Incorrect email or password");
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  signing,
};
