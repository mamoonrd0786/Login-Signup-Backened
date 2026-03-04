const Book = require('../models/book.model');
const ApiError = require('../utils/ApiError');
const { ERROR_CODES, HTTP_STATUS, SUCCESS_MESSAGES } = require('../utils/bookResponse.util')


// CREATE BOOK
const createBook = async function (req, res) {
    const { title, author, ISBN, category, quantity } = req.body;

    const availableBook = await Book.findOne({ $or: [{ ISBN, author, title }] });

    if (availableBook) {
        return res.status(400).json({
            statusCode: 400,
            message: "BOOK_AVAILABLE",
            success: false
        })
    }

    const createdBook = await Book.create({
        title: title,
        author: author,
        ISBN: ISBN,
        category: category,
        quantity: quantity,
        isAvailable: true
    })

    if (!createdBook.isAvailable) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
            message: ERROR_CODES.BOOK_NOT_FOUND,
            success: false
        })
    }

    return res.status(201).json(
        {
            message: SUCCESS_MESSAGES.BOOK_CREATED,
            success: true,
            data: createdBook,
        }
    )
}

// UPDATE_BOOK

const updateBook = async function (req, res, next) {
    const bookId = req.params.id;
    const { title, author, ISBN, category, quantity } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        {
            title,
            author,
            ISBN,
            category,
            quantity
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedBook) {
        return res.status(404).json({
            message: 'Book not found',
            success: false
        })
    }

    return res.status(HTTP_STATUS.SUCCESS).json({
        message: SUCCESS_MESSAGES.BOOK_UPDATED,
        success: true,
        data: updatedBook
    })
}


// GET_ALL_BOOKS

const getAllBooks = async function (req, res) {

    const allBooks = await Book.find(
        {},
        {
            title: 1,
            author: 1,
            ISBN: 1,
            category: 1,
            quantity: 1,
            language: 1
        }
    );

    if (!allBooks) {
        return res.status(HTTP_STATUS.SUCCESS).json({
            message: ERROR_CODES.BOOK_NOT_FOUND,
            success: false
        })
    }

    return res.status(HTTP_STATUS.SUCCESS).json({
        message: SUCCESS_MESSAGES.BOOK_LIST_RETRIEVED,
        success: true,
        data: allBooks
    })

}

// DELETE_BOOK

const deleteBook = async function (req, res) {
    const bookId = req.params.id;
    const deletedBook = await Book.findOneAndDelete(
        bookId,
        {
            projection: {
                title: 1,
                author: 1,
                ISBN: 1
            }
        }
    )

    if (!deletedBook) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
            {
                message: ERROR_CODES.INVALID_BOOK_ID,
                success: false
            }
        )
    }

    return res.status(HTTP_STATUS.SUCCESS).json({
        message: SUCCESS_MESSAGES.BOOK_DELETED,
        success: true,
        deletedBook
    })
}

// SEARCH_BOOK_THROUGH_TITLE_AND_AUTHOR

const searchBookWithPagination = async function (req, res) {

}


module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    searchBookWithPagination
};

