const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Dave Construction Backend</h1>");
});

app.use("/abrilo", (req, res) => {
  res.send("<h1>Abrilo</h1>");
});

app.use("/user", require("./routes/user.routes"));
app.use("/about", require("./routes/about.routes"));
module.exports = app;
