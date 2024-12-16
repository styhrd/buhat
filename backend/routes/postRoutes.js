import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createPost, deletePost, getAllPosts, getPostId, likePost, updatePost } from '../controllers/postController.js'

const router = express.Router()

router.post('/createPost', userAuth, createPost)
router.patch('/updatePost/:postId', userAuth, updatePost)
router.get('/getPostId/:postId', userAuth, getPostId)
router.get('/getPosts', userAuth, getAllPosts)
router.delete('/deletePost/:postId', userAuth, deletePost)


router.post('/like/:postId', userAuth, likePost)
export default router