import User from "../models/userModel.js"
import Workout from "../models/workoutModel.js"

export const createWorkout = async (req, res, next) => {
    try {
        const { target, name } = req.body
        
        if (!name || !target) {
            return res.status(404).json({
                message:"Provide All Fields"
            })
        }

        let user = await User.findById(req.user.userId)
        
        const workout = await Workout.create({
            name,target,createdBy: user._id
        })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.workoutsIds.push(workout._id)

        user = await user.save()

        res.status(200).json({
            workout
        })
    } catch (error) {
        next(error)
    }
}