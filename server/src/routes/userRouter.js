const { Router } = require("express");

const usersRouter = Router();

const {
  getUsersHandler,
  getDetailHandler,
  postUserHandler,
  putUserHandler,
  patchUserHandler,
  deleteUserHandler
} = require("../handlers/userHandler");

usersRouter.get("/", getUsersHandler);
usersRouter.get("/:id", getDetailHandler);
usersRouter.get("/name", getUsersHandler);
usersRouter.post("/post/", postUserHandler);
usersRouter.put("/put/:id", putUserHandler);
usersRouter.patch("/patch/:id", patchUserHandler);
usersRouter.delete("/:id", deleteUserHandler);

module.exports = usersRouter;
