const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const allUsers = asyncHandler(async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    if (users) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `All Users find successfully!!!`,
        data: users,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const oneUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const users = await prisma.users.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    if (users) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${users.name} find successfully!!!`,
        data: users,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const createUser = asyncHandler(async (req, res) => {
  try {
    let { id, name, email } = req.body;

    const user = await prisma.users.create({
      data: {
        id: id,
        name: name,
        email: email,
      },
    });

    if (user) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "User created successfully!!!",
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email, password } = req.body;
    const user = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    if (user) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "User updated successfully!!!",
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.delete({
    where: {
      id: Number(id),
    },
  });
  if (user) {
    return res.status(201).json({
      success: true,
      status: 201,
      message: `${user.name} deleted successfully!!!`,
      data: user,
    });
  }
});

module.exports = {
  createUser,
  oneUser,
  allUsers,
  updateUser,
  deleteUser,
};
