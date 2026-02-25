const Book = require('../models/book.model');

const createBook = async function (req, res) {
    // sabse pahle book ka data lenge
    // book available hai kya ye check karenge
    // savi fields ka validation check karenge 
    // book sirf admin hi add karsakta hai 
    // book add karenge 
    // agar book add nhi hua hai to ek error message generate karenge
    // agar book add ho gaya hai to user ko response karenge

    const { title, author, ISBN, category, quantity } = req.body;

    const bookAvailable = await Book.findOne({ $or: [{ ISBN, author, title }] });

    if (bookAvailable) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Book is already available',
            success: false
        })
    }

    

    const bookCreated = await Book.create({
        title: title,
        author: author,
        ISBN: ISBN,
        category: category,
        quantity: quantity,
        isAvailable: true
    })

    if (!bookCreated.isAvailable()) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Bad request',
            success: false,
            book: null
        })
    }

    return res.status(201).json(
        {
            message: 'Booke created',
            book: bookCreated,
            success: true,
        }
    )
}


module.exports = { createBook };