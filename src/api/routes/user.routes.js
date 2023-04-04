const express = require("express");
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

module.exports = userRoute;
