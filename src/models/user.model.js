const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password:
        {
            type: String,
            required: true,
            trim: true
        },
        refreshToken:
        {
            type: String
        },
        role: {
            type: String,
            enum: ["admin", "librarian", "user"],
            default: "user"
        }
    }, { timestamps: true })

userSchema.pre('save', async function (req, res, next) {
    if (!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateJSONWebToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            role: this.role
        },
        process.env.JWT_SECRET_KEY,
        {
            // expiresIn: process.env.JWT_EXPIRES_IN
            expiresIn: "15m"
        }
    )
}

userSchema.methods.generateRefreshJSONWebToken = function () {
    return jwt.sign(
        {
            _id: this._id

        },
        process.env.JWT_REFRESH_KEY,
        {
            // expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
            expiresIn: "7d"
        }
    )
}

module.exports = mongoose.model('User', userSchema);
