import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createPost, getPostId, updatePost } from '../controllers/postController.js'

const router = express.Router()

router.post('/createPost', userAuth, createPost)
router.patch('/updatePost/:postId', userAuth, updatePost)
router.get('/getPostId/:postId', userAuth, getPostId)
export default router