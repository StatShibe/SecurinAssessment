require("dotenv").config()
const express = require("express");
const connectDB = require("./config/DBConnect")
const CVSEData = require('./model/CVESDetails');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const CVESDetails = require("./model/CVESDetails");
const app = express();
const port = 3500;

app.use(express.json());

connectDB()

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/getdata", async(req, res) => {
    try {
        const { page, pageSize } = req.query;
        const pageNumber = parseInt(page) || 1;
        const limit = parseInt(pageSize) || 10;
    
        const totalCount = await CVSEData.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
    
        const data = await CVSEData.find()
          .skip((pageNumber - 1) * limit)
          .limit(limit);
    
        res.json({ data, totalCount, totalPages });
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.get("/getcve/:cveid", async(req, res) => {
    const cveid = req.params.cveid;
    console.log("hello there")  
    const record = await CVSEData.findOne({id : cveid});
    try{
        if (record) {
            // If found, send the record as the response
            res.json(record);
        } else {
            // If not found, send a 404 Not Found response
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error('Error retrieving record:', error);
    res.status(500).json({ message: 'Internal Server Error' });

}})

app.listen(port, ()=> {
    console.log(`Server is running at ${port}`);
})