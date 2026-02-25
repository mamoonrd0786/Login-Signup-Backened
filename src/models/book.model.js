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
            type: [{type: String, required: true}],
            required: [true, 'Author name should be compulsary'],
            unique: [true, 'Do not write same author name']

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
            min: 1,
            max: 10

        },
        isAvailable: {
            type: Boolean,
            default: false
        },
        coverURL: {
            type: String
        },
        status: {
            type: String,
            enum: ['available', 'out_of_stock', 'archived'],
            default: 'available'
        }
    },
    {
        timestamps: true
    }
)


module.exports = model('Book', bookSchema);