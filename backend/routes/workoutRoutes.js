import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createWorkout, deleteWorkout, getAllWorkouts, getWorkout, updateWorkout } from '../controllers/workoutController.js'

const router = express.Router()


router.patch('/update/:workoutId', userAuth, updateWorkout)
router.get('/get/:workoutId', userAuth,getWorkout)
router.post('/create', userAuth, createWorkout)
router.get('/getAll', userAuth, getAllWorkouts)
router.delete('/delete/:workoutId', userAuth, deleteWorkout)

export default router