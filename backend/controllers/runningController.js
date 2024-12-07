import User from "../models/userModel.js";
import Running from "../models/runningModel.js";
export const createExe = async (req, res, next) => {
    try {
        const { name } = req.body
        
        if (!name) {
             return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }

        const user = await User.findById(req.user.userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const running = await Running.create({
            name,
            createdBy: user._id
        })

        user.runningIds.push(running._id)
        await user.save()

        return res.status(201).json({
            success: true,
            message: "Run created successfully.",
            data: { running },
        })
    } catch (error) {
        next(error)
    }
}