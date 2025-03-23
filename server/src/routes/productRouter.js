const { Router } = require("express");
const { getProductHandler } = require("../handlers/productHandler");

const router = Router();

router.get("/", getProductHandler);
router.get("/:id");
router.get("/name", getProductHandler);
router.post("/");
router.put("/:id");
router.patch("/:id");
router.delete("/:id");

module.exports = router;