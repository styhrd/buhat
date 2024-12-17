import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createPost, deletePost, getAllLikes, getAllPosts, getPostId, getSaved, likePost, savePost, updatePost } from '../controllers/postController.js'

const router = express.Router()

router.post('/createPost', userAuth, createPost)
router.patch('/updatePost/:postId', userAuth, updatePost)
router.get('/getPostId/:postId', userAuth, getPostId)
router.get('/getPosts', userAuth, getAllPosts)
router.delete('/deletePost/:postId', userAuth, deletePost)


router.post('/like/:postId', userAuth, likePost)
router.post('/save/:postId', userAuth, savePost)
router.get('/likes', userAuth, getAllLikes)
router.get('/saved', userAuth, getSaved)
export default router 