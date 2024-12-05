import express from 'express'
import { createProfile, updateProfile } from '../controllers/profileController.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/create', userAuth, createProfile)
router.patch('/update/:profileId', userAuth ,updateProfile)

export default router