const { Router } = require("express");
const { getProductHandler } = require("../handlers/productHandler");
const { getDetailHandler } = require("../handlers/productHandler");

const router = Router();

router.get("/", getProductHandler);
router.get("/:id", getDetailHandler);
router.get("/name", getProductHandler);
router.post("/");
router.put("/:id");
router.patch("/:id");
router.delete("/:id");

module.exports = router;