import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js'
import cors from 'cors'
import morgan from 'morgan'


dotenv.config();
connectDB()
const app = express();

const PORT = process.env.PORT || 8080
const STR = process.env.STRING || 'string'

//routes

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use("/api/v1/test", testRoutes)


app.listen(PORT, () => {
    console.log(`Node Server is Running on ${PORT} ${STR}`)
})