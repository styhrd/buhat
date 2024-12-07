import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createExe } from '../controllers/runningController.js'



const router = express.Router()


router.post('/create',userAuth,createExe)

export default router