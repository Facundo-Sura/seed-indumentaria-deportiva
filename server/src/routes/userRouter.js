const { Router } = require("express");

const router = Router();

const {
  getUsersHandler,
  getDetailHandler,
  postUserHandler,
  putUserHandler,
  patchUserHandler,
  deleteUserHandler
} = require("../handlers/userHandler");

router.get("/", getUsersHandler);
router.get("/:id", getDetailHandler);
router.get("/name", getUsersHandler);
router.post("/post/", postUserHandler);
router.put("/put/:id", putUserHandler);
router.patch("/patch/:id", patchUserHandler);
// router.delete("/:id", deleteUserHandler);

module.exports = router;
