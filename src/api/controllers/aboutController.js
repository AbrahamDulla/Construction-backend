const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { winston } = require("winston");
const { request } = require("express");

const prisma = new PrismaClient();

const allAbout = asyncHandler(async (req, res) => {
  try {
    const about = await prisma.abouts.findMany();
    if (about && about.length > 0) {
      return res.status(200).json({
        success: true,
        message: `All About found successfully!`,
        data: abouts,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `No about found.`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `An error occurred while fetching about.`,
    });
  }
});

const allAbouts = asyncHandler(async (req, res) => {
  try {
    const users = await prisma.abouts.findMany();
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
const oneAbout = asyncHandler(async (req, res) => {
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
const createAbout = asyncHandler(async (req, res) => {
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
const updateAbout = asyncHandler(async (req, res) => {
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
const deleteAbout = asyncHandler(async (req, res) => {
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
  createAbout,
  oneAbout,
  allAbout,
  updateAbout,
  deleteAbout,
};
