const { User } = require("../db");

const getEmailController = async (email) => {
  return await User.findOne({ where: { email } });
};

const createUserController = async (email, password) => {
  return await User.findOrCreate({ where: { email, password } });
};

module.exports = { getEmailController, createUserController };
