const { Router } = require('express');
const { createBook, deleteBook, updateBook, getAllBooks, searchBookWithPagination } = require('../controllers/book.controller');
const { validate } = require('../middlewares/validate.middlware');
const validateBook = require('../validators/book.validator');
const bookRouter = Router();

bookRouter.route('/create-book').post(validateBook, validate, createBook);
bookRouter.route('/update-book/:id').post(validateBook, validate, updateBook);
bookRouter.route('/get-books').get(getAllBooks);
bookRouter.route('/delete-book/:id').get(deleteBook)
bookRouter.route('/search-book').get(searchBookWithPagination)

module.exports = bookRouter;