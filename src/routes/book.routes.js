const { Router } = require('express');
const { createBook, deleteBook, updateBook, getAllBooks, searchBookWithPagination } = require('../controllers/book.controller');
const { bookIssue, returnBook } = require('../controllers/bookissue.controller');
const { validate } = require('../middlewares/validate.middlware');
const validateBook = require('../validators/book.validator');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');
const bookRouter = Router();

bookRouter.route('/create-book').post(validateBook, validate, allowRoles('admin'), createBook);
bookRouter.route('/update-book/:id').put(validateBook, validate, allowRoles(['admin', 'librariyan']), updateBook);
bookRouter.route('/get-books').get(allowRoles(['member', 'admin', 'librariyan']), getAllBooks);
bookRouter.route('/delete-book/:id').get(allowRoles('admin'), deleteBook);
bookRouter.route('/search-book').get(allowRoles(['admin', 'librariyan', 'member']), searchBookWithPagination);
bookRouter.route('/book-issue/:bookId/:userId').get(verifyJWT, allowRoles('librariyan'), bookIssue);
bookRouter.route('/return-book/:id').post(verifyJWT, allowRoles('librariyan'), returnBook);

module.exports = bookRouter;