const express = require("express");
const app = express();
const router = require("./src/router/routes");

app.use(express.static(__dirname + "/public"));
app.use("/", router);

module.exports = app;
