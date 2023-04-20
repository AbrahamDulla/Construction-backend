const express = require("express");
const aboutRoute = express.Router();

const {
  createAbout,
  allAbout,
  oneAbout,
  updateAbout,
  deleteAbout,
} = require("../controllers/aboutController");

aboutRoute.post("/create", createAbout);
aboutRoute.get("/all-about", allAbout);
aboutRoute.get("/:id", oneAbout);
aboutRoute.put("/:id", updateAbout);
aboutRoute.delete("/:id", deleteAbout);

module.exports = aboutRoute;
