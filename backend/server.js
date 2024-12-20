import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors'
import morgan from 'morgan'
import cron from 'node-cron'
import Nutrition from "./models/nutritionModel.js";
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from "./middleware/errorMiddleware.js";
import profileRoutes from './routes/profileRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'
import runningRoutes from './routes/runningRoutes.js'
import postRoutes from './routes/postRoutes.js'
import nutritionRoutes from './routes/nutritionRoutes.js'

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
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/workout", workoutRoutes)
app.use("/api/v1/exercise", exerciseRoutes)
app.use("/api/v1/run", runningRoutes)
app.use("/api/v1/community", postRoutes)
app.use("/api/v1/nutrition",nutritionRoutes)
app.use(errorMiddleware)


app.listen(PORT, () => {
    console.log(`Node Server is Running on ${PORT} ${STR}`)
})

cron.schedule('0 0 * * *', async () => {
    try {
        // Get the start and end of the current day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Reset the caloriesConsumed and foodLogs for all Nutrition logs
        await Nutrition.updateMany(
            {
                date: { $gte: startOfDay, $lt: endOfDay },
           },
            {
                $set: {
                    caloriesConsumed: 0,
                    foodLogs: [],
                    date: new Date(), // Set the date to the current timestamp
                },
            }
        );

        console.log('Nutrition logs reset for the day.');
    } catch (error) {
        console.error('Error resetting nutrition logs:', error);
    }
});


