const User = require('../models/userModel');

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email']
    });
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email']
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
