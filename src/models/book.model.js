const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Provide the book tilte'],
            unique: [true, "Don't write upload the same book again"],
            index: true

        },
        author: {
            type: [
                {
                    type: String,
                    // type: mongoose.Schema.Types.ObjectId,
                    required: [true, 'Author is required'],
                    // ref: 'Author'
                }
            ],

        },
        ISBN: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        category: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 0
        },
        isAvailable: {
            type: Boolean,
            default: false
        },
        coverImg: {
            type: String
        },
        status: {
            type: String,
            enum: ['available', 'out_of_stock', 'archived'],
            default: 'available'
        },
        language: {
            type: String,
            enum: ['english', 'urdu', 'arabic', 'hindi'],
            default: 'english'
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)


module.exports = model('Book', bookSchema);