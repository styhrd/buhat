import express from 'express'
import userAuth from '../middleware/authMiddleware'
import router from './profileRoutes'
import { createNut } from '../controllers/nutritionController'

const router = express.Router()


router.post('/create', userAuth,createNut)


export default router