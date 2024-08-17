import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';


dotenv.config();
connectDB()
const app = express();

const PORT = process.env.PORT || 8080 
const STR = process.env.STRING || 'string' 

//routes

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Buhat</h1>")
})

app.listen(PORT, () => {
    console.log(`Node Server is Running on ${PORT} ${STR}`)
})