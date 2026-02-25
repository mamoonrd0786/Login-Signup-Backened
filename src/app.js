const express = require('express');
const cookieParser = require("cookie-parser");
const {rateLimit} = require("express-rate-limit");
const app = express();

const limiter =rateLimit({
    windowMs: 15 * 60 * 100,
    limit: 5,
    // max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, Try after somtime"
})

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


// User routes
const userRouter = require("./routes/user.routes");
app.use("/api/v1/users", userRouter);

// Book routes

const bookRouter = require('./routes/book.routes');
app.use("/api/v1/books", bookRouter);




module.exports = app;