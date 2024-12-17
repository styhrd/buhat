import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createFood, deleteFood, getFood, updateFood } from '../controllers/nutritionController.js'


const router = express.Router()


router.post('/createFood', userAuth,createFood)
router.patch('/updateFood/:foodId', userAuth, updateFood)
router.get("/getFood/:foodId", userAuth, getFood)
router.delete("/delFood/:foodId", userAuth, deleteFood)
export default router