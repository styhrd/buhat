import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors'
import morgan from 'morgan'
import cron from 'node-cron'
import Nutrition from "./models/nutritionModel.js";
import authRoutes from './routes/authRoutes.js'

dotenv.config();
connectDB()
const app = express();

const PORT = process.env.PORT || 8080
const STR = process.env.STRING || 'string'

//routes

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use("/api/v1/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`Node Server is Running on ${PORT} ${STR}`)
})

cron.schedule('0 0 * * *', async () => {
    try {
        // Find all nutrition records for the current day
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight

        const nutritionLogs = await Nutrition.find({ date: today });

        // Reset caloriesConsumed and foodLogs for each entry
        for (const log of nutritionLogs) {
            log.caloriesConsumed = 0;
            log.foodLogs = [];
            log.date = new Date(); // Set new date for the next day

            await log.save(); // Save the updated log
        }

        console.log('Nutrition logs reset for the day.');
    } catch (error) {
        console.error('Error resetting nutrition logs:', error);
    }
});