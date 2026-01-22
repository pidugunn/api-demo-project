const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

app.use("/users", userRoutes);

module.exports = app;
