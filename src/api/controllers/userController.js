const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");

const allUsers = asyncHandler(async (req, res) => {
  //he page parameter determines the current page.
  // limit sets the number of records to return per page.
  //the OFFSET keyword skip the first n rows or records
  //and then use the LIMIT keyword to retrieve the next m rows or records.

  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const users = await prisma.users.findMany({
      take: limit,
      skip: offset,
    });
    if (users.length > 0) {
      return res.json({
        success: true,
        message: "All users fetched successfully",
        page: page,
        limit: limit,
        data: users,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No user found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
});

const oneUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findFirst({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`,
      });
    }
    return res.json({
      success: true,
      message: `User with ID ${id} fetched successfully`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
});

const createUser = asyncHandler(async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, password } = req.body;
    // hash password
    const hash = crypto.createHash("sha256");
    hash.update(password);
    const hashedPassword = hash.digest("hex");
    // create user
    const user = await prisma.users.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
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
      .json({ message: `Internal Server Error: ${error.message}` });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, email, password } = req.body;

    // validate fields
    if (!first_name || !last_name || !phone_number || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if user exists
    const existingUser = await prisma.users.findUnique({ where: { id: id } });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
      });
    }

    // hash password
    const hash = crypto.createHash("sha256");
    hash.update(password);
    const hashedPassword = hash.digest("hex");

    // update user
    const user = await prisma.users.update({
      where: { id: id },
      data: {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message: `User with ID ${id} updated successfully`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await prisma.users.findUnique({ where: { id: id } });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
      });
    }
    const user = await prisma.users.delete({
      where: { id: id },
    });
    if (user) {
      return res.json({
        success: true,
        message: `User with ID ${id} deleted successfully`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
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
