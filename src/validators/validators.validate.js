const { body, check } = require("express-validator");

exports.validateSignup = [
    body('username')
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username should be a string")
        .trim()
        .isLength({ min: 2, max: 15 })
        .withMessage("Username must be between 2 to 15 characters")
        .matches(/^[a-zA-Z\s-]+$/)
        .isAlphanumeric()
        .withMessage('Username can only contain letters, spaces, and hyphens'),
    body('email')
        .isEmail()
        .withMessage("Email is required")
        .isLength({ min: 10, max: 30 })
        .withMessage("Email must be between 10 to 30 characters"),
    body('password')
        .isLength({ min: 8, max: 12 })
        .withMessage("Password should be 8 to 12 digits")]


exports.validateLogin = [
    check('email', "Email should be 10 to 30 characters")
        .isEmail()
        .isLength({ min: 10, max: 30 }),
    check('password', "Password number should contains 8 to 12 digits")
        .isLength({ min: 8, max: 12 })]