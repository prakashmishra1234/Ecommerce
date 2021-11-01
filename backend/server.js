const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require("cloudinary");
const connectDataBase = require('./config/database');

//Handling Uncaught Exceptions
process.on('unCaughtException', (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);

    process.exit(1);
});

//config
dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDataBase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
    console.log(`server working on http://localhost:${process.env.PORT}`)
})

//Unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');

    server.close(() => {
        process.exit(1);
    })
});