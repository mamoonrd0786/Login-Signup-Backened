const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const authorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('Author', authorSchema);