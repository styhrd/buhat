import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createExe, getRunId, updateRun } from '../controllers/runningController.js'



const router = express.Router()


router.post('/create',userAuth,createExe)
router.patch('/update/:runId', userAuth, updateRun)
router.get('/getId/:runId',userAuth,getRunId)
export default router