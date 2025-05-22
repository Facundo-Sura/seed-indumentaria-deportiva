const { Router } = require("express");

const router = Router();

const {
  getUsersHandler,
  getDetailHandler,
  postUserHandler,
  postAdminHandler,
  putUserHandler,
  patchUserHandler,
  deleteUserHandler
} = require("../handlers/userHandler");

router.get("/", getUsersHandler);
router.get("/:id", getDetailHandler);
router.post("/post/", postUserHandler);
router.post("/post/admin", postAdminHandler);
router.put("/put/:id", putUserHandler);
router.patch("/patch/:id", patchUserHandler);
// router.delete("/:id", deleteUserHandler);

module.exports = router;
