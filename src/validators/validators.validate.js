const { body, check } = require("express-validator");

exports.validateSignup = [
    body('name')
        .notEmpty()
        .withMessage('Name should be required'),
    body('username')
        .notEmpty()
        .withMessage("Username is required")
        .trim()
        .isLength({ min: 2, max: 15 })
        .withMessage("Username must be between 2 to 15 characters")
        .isAlphanumeric()
        .withMessage('Username can only contain letters, spaces, and hyphens')
        .isLowercase(),
    body('email')
        .isEmail()
        .withMessage("Email is required")
        .isLength({ min: 10, max: 30 })
        .withMessage("Email must be between 10 to 30 characters")
        .trim()
        .isLowercase(),
    body('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 8, max: 12 })
        .withMessage("Password should be 8 to 12 digits")
        .trim()
]


exports.validateLogin = [
    // check('username', 'Username should be required')
    //     .notEmpty()
    //     .withMessage("Username is required")
    //     .trim()
    //     .isAlphanumeric('Username can only contain letters, spaces, and hyphens')
        // .withMessage(''),
    check('email', "Email should be 10 to 30 characters")
        .isEmail()
        .isLength({ min: 10, max: 30 })
        .trim()
        .isLowercase(),
    check('password', "Password number should contains 8 to 12 digits")
        .isLength({ min: 8, max: 12 })
        .trim()
]