const { users } = require("../data/users");

const getAllUsers = (req, res) => {
  const { search } = req.query;

  let result = users;

  if (search) {
    result = result.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(result);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

const createUser = (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ message: "name and role are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  const { name, role } = req.body;

  users[index] = {
    id,
    name: name || users[index].name,
    role: role || users[index].role
  };

  res.json(users[index]);
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
