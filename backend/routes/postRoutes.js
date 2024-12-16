import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createPost, getAllPosts, getPostId, updatePost } from '../controllers/postController.js'

const router = express.Router()

router.post('/createPost', userAuth, createPost)
router.patch('/updatePost/:postId', userAuth, updatePost)
router.get('/getPostId/:postId', userAuth, getPostId)
router.get('/getPosts', userAuth, getAllPosts)
export default router