import express from 'express'
import { getUserById, loginController, registerController } from '../controllers/authController.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/getUser/:userId', getUserById)
export default router