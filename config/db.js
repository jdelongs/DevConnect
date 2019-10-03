const mongoose = require('mongoose');
const config = require("config");
const db = config.get('mongoURI');

//gives back a promise
const connectDB = async () => {
    try {
        //returns a promise
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true, 
            useFindAndModify: false
        });

        console.log('mongodb connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;