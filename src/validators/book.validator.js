const { body } = require("express-validator");

const validateBook = [
    body('title')
        .notEmpty()
        .withMessage("Title should be required"),
    body('author')
        .notEmpty()
        .withMessage('Author name should be required'),
    body('ISBN')
        .isISBN()
        .withMessage('Enter valid ISBN'),
    body('quantity')
        .notEmpty()
        .withMessage('Quantity should be required'),
    body('category')
        .notEmpty()
        .withMessage('Category will be required')
]

module.exports = validateBook;