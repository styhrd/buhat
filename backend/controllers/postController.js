import User from "../models/userModel.js";
import Post from '../models/postModel.js'


export const createPost = async (req, res, next) => {
    try {
        const { title, description } = req.body
        
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            })
        }

        const user = await User.findById(req.user.userId)
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found.",
                    });
        }
        
        const post = await Post.create({
            title,
            description,
            createdBy: user._id,

        })

        user.posts.push(post._id)
        await user.save()

        return res.status(201).json({
            success: true,
            message: "Post created successfully.",
            data: { post },
        })
    } catch (error) {
        next(error)
    }
}