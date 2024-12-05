import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createWorkout } from '../controllers/workoutController.js'

const router = express.Router()


router.post('/create', userAuth, createWorkout)

export default router