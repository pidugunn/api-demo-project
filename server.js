const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Chetan", role: "Developer" }
];

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET user by id
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// POST create user
app.post("/users", (req, res) => {
  const { name, role } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    role
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) return res.status(404).json({ message: "User not found" });

  users[userIndex] = { id, ...req.body };
  res.json(users[userIndex]);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);

  res.json({ message: "User deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
