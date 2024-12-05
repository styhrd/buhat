import express from 'express'
import { createProfile } from '../controllers/profileController.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/create', userAuth ,createProfile)

export default router