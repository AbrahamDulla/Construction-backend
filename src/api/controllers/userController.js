const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");

const allUsers = asyncHandler(async (req, res) => {
  //he page parameter determines the current page.
  // limit sets the number of records to return per page.
  //the OFFSET keyword skip the first n rows or records
  //and then use the LIMIT keyword to retrieve the next m rows or records.
  const { page = 1, limit = 4 } = req.query;
  const offset = (page - 1) * limit;
  const users = await prisma.users.findMany({
    take: limit,
    skip: offset,
  });
  if (users.length > 0) {
    return res.json({
      success: true,
      message: "All users fetched successfully",
      data: users,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "No user found.",
    });
  }
});

const oneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: { id: Number(id) },
  });
  if (user) {
    return res.json({
      success: true,
      message: `User with ID ${id} fetched successfully`,
      data: user,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: `User with ID ${id} not found`,
    });
  }
});

const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // hash password
    const hash = crypto.createHash("sha256");
    hash.update(password);
    const hashedPassword = hash.digest("hex");
    // create user
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({
      success: true,
      message: `User ${user.name} created successfully`,
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal server Error: ${error.message}` });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  // hash password
  const hash = crypto.createHash("sha256");
  hash.update(password);
  const hashedPassword = hash.digest("hex");
  // update user
  const user = await prisma.users.update({
    where: { id: Number(id) },
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  return res.json({
    success: true,
    message: `User with ID ${id} updated successfully`,
    data: user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.delete({
    where: { id: Number(id) },
  });
  return res.json({
    success: true,
    message: `User with ID ${id} deleted successfully`,
    data: user,
  });
});

module.exports = {
  createUser,
  oneUser,
  allUsers,
  updateUser,
  deleteUser,
};
