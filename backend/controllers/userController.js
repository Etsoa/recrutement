const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ message: 'Hello from UserController!', users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.json({ message: `Hello User ${id}!`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json({ message: 'User created successfully!', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
