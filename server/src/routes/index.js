const { Router } = require("express");

const router = Router();

// const cartRouter = require("./cartRouter");
// const orderRouter = require("./orderRouter");
// const payRouter = require("./payRouter");
const productRouter = require("./productRouter");
// const questionRouter = require("./questionRouter");
// const reviewRouter = require("./reviewRouter");
const usersRouter = require("./userRouter");

router.use("/users", usersRouter);
router.use("/products", productRouter);
// router.use("/order", orderRouter);
// router.use("/pay", payRouter);
// router.use("/cart", cartRouter);
// router.use("/questions", questionRouter)
// router.use("/reviews", reviewRouter)

router.use("*", (req, res, next) => {
  return res.status(404).json({
    status: 404,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

module.exports = router;
