const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("connected");
    } catch (err){
        console.error(err);
    }
}

module.exports = connectDB;