// require('dotenv').config();
const dotenv = require("dotenv");
dotenv.config({path: "./.env"})
const app = require("./app.js");
const connectDB = require("./db/database.js");


// Connect to database
connectDB().then(function () {
    app.listen(process.env.PORT, function () {
        console.log(`App is running on PORT NUMBER: ${process.env.PORT}`);
    })

}).catch((error)=> {
    console.error(`Something went wrong in Database`, error);
});

