import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createWorkout, updateWorkout } from '../controllers/workoutController.js'

const router = express.Router()


router.patch('/update/:workoutId', userAuth, updateWorkout)
router.post('/create', userAuth, createWorkout)

export default router