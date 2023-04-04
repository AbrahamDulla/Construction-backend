const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const winston = require("winston");
const prisma = new PrismaClient();

const createAdress = asyncHandler(async (req, res) => {
  try {
    const { id, name, image } = req.body;
    const address = await prisma.address.create({
      data: {
        id: id,
        name: name,
        image: image,
      },
    });

    if (address) {
      res.status(201).json({
        success: true,
        status: 201,
        message: "Address created successfully!!!",
        data: address,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

module.exports = {
  createAdress,
};
