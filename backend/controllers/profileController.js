import Profile from '../models/profileModel.js'
import User from '../models/userModel.js'

export const createProfile = async (req, res, next) => {
    try {
        const { age, weight, height, description, activityLevel, weightGoal, weightLogs } = req.body
        
        if (!age || !weight || !height || !description || !activityLevel || !weightGoal) {
            return res.status(400).json({
                message: "Provide All Fields"
            })
        }


        let user = await User.findById(req.user.userId)

        if (user.profileId) {
            return res.status(400).json({
                message: "Profile Already Exist"
            })
        }

         const profile = await Profile.create({
            age, weight, height, description, activityLevel, weightGoal, weightLogs, createdBy: user._id
        })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profileId = profile._id

        user = await user.save();

        res.status(201).json({profile})

    } catch (error) {   
        next(error)
    }
}