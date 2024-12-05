import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createWorkout, getWorkout, updateWorkout } from '../controllers/workoutController.js'

const router = express.Router()


router.patch('/update/:workoutId', userAuth, updateWorkout)
router.get('/get/:workoutId', userAuth,getWorkout)
router.post('/create', userAuth, createWorkout)

export default router