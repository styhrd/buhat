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

export const updateWorkout = async (req, res, next)=>{
    try {
        const { target, name,visibility } = req.body
        const workoutId = req.params.workoutId

        let workout = await Workout.findById(workoutId)

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        if (target) {
            workout.target=target
        }
        if (name) {
            workout.name=name
        }

        if (visibility) {
            workout.visibility=visibility
        }

        workout = await workout.save()
        
        res.status(200).json({
            workout
        })
    } catch (error) {
        next(error)
    }
}

export const getWorkout = async (req, res, next) => {
    try {
        const workoutId = req.params.workoutId

        const workout = await Workout.findById(workoutId)

        if (!workout) {
            return res.status(404).json({message:"Workout not Found"})
        }

        res.status(200).json({workout})
    } catch (error) {
        next(error)
    }
}