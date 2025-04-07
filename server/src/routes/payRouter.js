const {Router} = require("express");
const { processPayment } = require("../controllers/payController");

const router = Router();

router.post("/", processPayment);

module.exports = router;