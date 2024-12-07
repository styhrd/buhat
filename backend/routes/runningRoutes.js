import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createExe, updateRun } from '../controllers/runningController.js'



const router = express.Router()


router.post('/create',userAuth,createExe)
router.patch('/update/:runId',userAuth,updateRun)
export default router