const express = require("express");
const app = express();
const MyError = require('./utils/MyError');
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//routes
app.use("/api/v1/products/", productRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/cart/", cartRouter);

app.all('*', (req, res, next) => {
    next(new MyError('route not found', 404));
});

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        const statusCode = err.statusCode || 500;
        const status = err.status || "error";
        res.status(statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
        });
    } else {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } else {
            res.status(500).json({
                status: "error",
                message: "server error",
            });
        }
    }
});

module.exports = app;