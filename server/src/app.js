//librerias necesarias
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//rutas
const userRouter = require("./routes/userRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Seed indumentaria deportiva",
  });
});

app.get("/user", userRouter);

app.use("*", (req, res, next) => {
  return res.status(404).json({
    status: 404,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
