const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoriesRouter = require("./category");
const userRouter = require("./user.js");
// const googleRouter = require("./google.js")
const carritoRouter = require("./carrito.js");
const ordenRouter = require("./orden.js");
const devRouter = require("./dev.js");
const checkoutRouter = require("./mercadopago.js");
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/checkout", checkoutRouter);
router.use("/products", productRouter);
router.use("/categories", categoriesRouter);
router.use("/user", userRouter);
router.use("/carrito", carritoRouter);
router.use("/dev", devRouter);
router.use("/orden", ordenRouter);

module.exports = router;
