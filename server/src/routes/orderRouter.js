const { Router } = require("express");

const router = Router();

router.get("/");
router.get("/:id");
router.get("/name");
router.post("/");
router.put("/:id");
router.patch("/:id");
//router.delete("/:id");

module.exports = router;