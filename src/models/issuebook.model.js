const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const issueBookSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookIssued: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    issueDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: null
    },
    dueDate: {
        type: Date
    },
    fine: {
        type: Number,
        default:0
    },
    status: {
        type: String,
        enum: ['issued', 'returned', 'late'],
        default: 'issued'
    }
})




module.exports = model('IssueBook', issueBookSchema);