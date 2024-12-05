import express from 'express'
import { createProfile, getProfile, updateProfile } from '../controllers/profileController.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/create', userAuth, createProfile)
router.patch('/update/:profileId', userAuth ,updateProfile)
router.get('/get', userAuth ,getProfile)
export default router