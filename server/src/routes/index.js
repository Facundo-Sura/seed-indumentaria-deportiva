const { Router } = require("express");

const router = Router();

const usersRouter = require("./userRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");
const payRouter = require("./payRouter");

router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/order", orderRouter);
router.use("/pay", payRouter);
// router.use("/questions")
// router.use("/reviews")

router.use("*", (req, res, next) => {
    return res.status(404).json({
      status: 404,
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });

module.exports = router;
