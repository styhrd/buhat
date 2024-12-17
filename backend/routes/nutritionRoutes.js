import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createFood, updateFood } from '../controllers/nutritionController.js'


const router = express.Router()


router.post('/createFood', userAuth,createFood)
router.patch('/updateFood/:foodId', userAuth,updateFood)

export default router