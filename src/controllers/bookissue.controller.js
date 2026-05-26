const IssueBook = require("../models/issuebook.model");
const Book = require('../models/book.model');
const fs = require('fs');
const { sendIssueBookDetails } = require('../services/email.service');


// BOOK_ISSUE

const bookIssue = (async (req, res) => {
    const { bookId, userId } = req.params;
    const { issueDate, returnDate } = req.body;
    const userLoggedIn = req.user._id;
    const book = await Book.findById(bookId);


    if (!book) {
        return res.status(400).json({
            message: 'Book is out of stock',
            success: false
        })
    }

    if (book.quantity <= 0) {
        return res.status(404).json({
            message: "Book's copy is not available",
            success: false
        })
    }

    if (!userLoggedIn) {
        return res.status(200).json({
            message: 'Login first and then issue the book',
            success: false,
        })
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);


    const bookIssueDone = await IssueBook.create({
        user: userId,
        bookIssued: bookId,
        issueDate: issueDate,
        returnDate: returnDate,
        dueDate: dueDate
    })

    fs.open('index.txt', 'r+', function (error, fd) {
        if (error) {
            return console.error("Error opening file:", error);
        }
        console.log("File Descriptor:", fd);

    });

    
    // fs.writeFile('index.txt', JSON.stringify({ bookId: bookId, userId: userId, issueDate: issueDate, returnDate: returnDate }, null, 2), 'utf8', (err)=>{
    //     if (err) {
    //         console.error('Writing a file is wrong', err);
    //         return
    //      }
    //      console.log('Writing a file is successfull');

    // });

    // if (!(bookIssueDone.status === 'issued')) {
    //     return res.status(400).json({
    //         message: 'The Book has already issued'
    //     })
    // }


    book.quantity -= 1;
    await book.save();

    await sendIssueBookDetails(book.title, bookIssueDone.issueDate, bookIssueDone.returnDate, req.user.email);

    return res.status(200).json({
        message: 'Book issued',
        success: true,
        data: bookIssueDone
    })

})


// RETURN_BOOK

const returnBook = (async (req, res) => {
    const issueId = req.params.id;  // id ek string hoti hai to destructure use nho hota hai ye use hota srf object 

    const issueBook = await IssueBook.findById(issueId);
    // console.log("Issue ", issueBook);


    if (!issueBook) {
        return res.status(400).json({
            message: 'Issue record not found',
            success: false
        })
    }

    const returnDate = new Date();

    let fine = 0;
    if (returnDate > issueBook.dueDate) {
        const lateDays = Math.ceil((returnDate - issueBook.dueDate) / (1000 * 60 * 60 * 24));
        return fine = lateDays * 10;

    }

    issueBook.returnDate = returnDate;
    issueBook.fine = fine;
    issueBook.status = 'returned';
    issueBook.save();
    // console.log('book issue id ', bookIssue.bookIssued);

    // fs.open('/index.txt', 'r', function(error){
    //     if (error) {
    //         console.log('Error from open file ',error);

    //     }
    // })
    let getData = await fs.readFile('index.txt', 'utf8');

    const data = await JSON.parse('getData');

    console.log('File data', data);
    console.log('File data', getData);

    const book = await Book.findByIdAndUpdate(
        issueBook.bookIssued,
        {
            $inc: { quantity: 1 }
        },
        {
            new: true
        }
    )


    return res.status(200).json({
        message: 'Book returned',
        success: true,
        data: book
    })

})

module.exports = {
    bookIssue,
    returnBook
}