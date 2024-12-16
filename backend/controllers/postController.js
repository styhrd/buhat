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

export const updatePost = async (req, res, next)=> {
    try {
        const { postId } = req.params
        const { title, description } = req.body
        
        const post = await Post.findById(postId)

        if (!post) {
             return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }

        if (title !== undefined) post.title = title;
        if (description !== undefined) post.description = description;
       
        await post.save()

        res.status(200).json({
            success: true,
            message: "Post updated successfully.",
            data: post,
        });


    } catch (error) {
        next(error)
    }
}

