import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createPost, updatePost } from '../controllers/postController.js'

const router = express.Router()

router.post('/createPost', userAuth, createPost)
router.patch('/updatePost/:postId', userAuth, updatePost)

export default router