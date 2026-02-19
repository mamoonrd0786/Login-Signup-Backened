const mongoose = require('mongoose');
const { DB_NAME } = require("../constants");

const connectDB = async function () {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Database connected succesfully ${connectionInstance.connection.host}`);

    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

module.exports = connectDB;