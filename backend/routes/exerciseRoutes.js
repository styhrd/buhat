import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createExercise, exerciseGetbyId, updateExercise } from '../controllers/exerciseController.js'
const router = express.Router()

router.post('/create', userAuth, createExercise)
router.patch('/update/:exerciseId', userAuth, updateExercise)
router.get('/get/:exerciseId', userAuth, exerciseGetbyId)
export default router