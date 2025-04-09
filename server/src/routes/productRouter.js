const { Router } = require("express");

const router = Router();

const {
  getProductHandler,
  getDetailHandler,
  postProductHandler,
  putProductHandler,
  patchProductHandler,
  deleteProductHandler,
} = require("../handlers/productHandler");

router.get("/", getProductHandler);
router.get("/:id", getDetailHandler);
router.get("/name", getProductHandler);
router.post("/", postProductHandler);
router.put("/:id", putProductHandler);
router.patch("/:id", patchProductHandler);
router.delete("/:id", deleteProductHandler);

module.exports = router;