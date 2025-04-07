const {Router} = require("express");
const { processPayment } = require("../controllers/payController");

const router = Router();

router.get("/");
router.post("/", processPayment);
router.delete("/");

module.exports = router;