import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createExercise } from '../controllers/exerciseController.js'
const router = express.Router()

router.post('/create', userAuth, createExercise)

export default router