const express = require("express");
// const connection = require("../connection");
const userRoute = express.Router();

const {
  createUser,
  allUsers,
  oneUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

userRoute.post("/create", createUser);
userRoute.get("/all-users", allUsers);
userRoute.get("/:id", oneUser);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

userRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is user read page</h1>");
});

module.exports = userRoute;
