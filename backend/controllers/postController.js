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

export const getPostId = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)

        if (!post) {
             return res.status(200).json({
                success: false,
                message:"Post Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Post Feteched",
            data:post
        })

    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req, res, next) => {
    try {
         const postId = req.params.postId
        const post = await Post.findById(postId)

        if (!post) {
             return res.status(200).json({
                success: false,
                message:"Post Not Found"
            })
        }

        await post.deleteOne()

        await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    posts:postId
                }
            }
        )

         res.status(200).json({
            success: true,
            message:"Post Deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllPosts = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const posts = await Post.find({
            createdBy:userId
        })

        if (posts.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No Posts found",
                    data: [],
                });
        }
        
        res.status(200).json({
                success: true,
                message: "Post retrieved successfully",
                data: posts,
            });
    } catch (error) {
        next(error)
    }
}

export const likePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.userId;

        const user = await User.findById(userId);

        if (user.likes.includes(postId)) {
            user.likes.pull(postId);
        } else {
            user.likes.push(postId);
        }

        await user.save();

        res.status(200).json({ success: true, message: "Post updated successfully." });
    } catch (error) {
        next(error);
    }
};

export const savePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.userId;

        const user = await User.findById(userId);

        if (user.savedPosts.includes(postId)) {
            user.savedPosts.pull(postId);
        } else {
            user.savedPosts.push(postId);
        }

        await user.save();

        res.status(200).json({ success: true, message: "Post updated successfully." });
    } catch (error) {
        next(error)
    }
}

export const getAllLikes = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        // Find the user and populate the 'likes' array with post details
        const user = await User.findById(userId).populate({
            path: "likes", // The field to populate
            model: "Post", // Reference the Post model
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            likes: user.likes, // Return full post details
        });
    } catch (error) {
        next(error);
    }
};

export const getSaved = async (req, res, next) => {
    try {
        const userId = req.user.userId

        const user = await User.findById(userId).populate({
            path: "savedPosts",
            model:"Post"
        })

         if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            likes: user.savedPosts, // Return full post details
        });
    } catch (error) {
       next(error) 
    }
}