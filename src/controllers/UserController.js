const User = require("../models/User");

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json("User doesn't exist");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(400).json("There are not users");

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  findUser,
  findAllUsers,
};
