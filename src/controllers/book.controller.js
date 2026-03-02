const Book = require('../models/book.model');

const createBook = async function (req, res) {
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

// Fetch all the book

const getAllBooks = async function(req, res){
    const logInUser = req.user;

    if (!logInUser) {
        setTimeout(async function(){
            return res.json(
                new Error('Logged in please !!')
            )
        }, 4000)
    }

   const allBooks = await Book.find({});

   return res.status(200).json({
    statusCode: 200,
    allBooks: allBooks,
    message: 'All books'
   })
}

// Update books




module.exports = { createBook, getAllBooks };

