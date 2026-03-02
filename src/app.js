const express = require('express');
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const path = require('path');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const limiter = rateLimit({
    windowMs: 15 * 60 * 100,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, Try after somtime"
})

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors({
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(helmet());


// User routes

const userRouter = require("./routes/user.routes");
app.use("/api/v1/users", userRouter);

// Book routes

const bookRouter = require('./routes/book.routes');
app.use("/api/v1/books", bookRouter);
module.exports = app;