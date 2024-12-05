import User from "../models/userModel.js"
import Workout from "../models/workoutModel.js"

export const createWorkout = async (req, res, next) => {
    try {
        const { target, name } = req.body;

        
        if (!name || !target) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }

        
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        
        const workout = await Workout.create({
            name,
            target,
            createdBy: user._id,
        });

       
        user.workoutsIds.push(workout._id);
        await user.save();

        
        return res.status(201).json({
            success: true,
            message: "Workout created successfully.",
            data: { workout },
        });
    } catch (error) {
        next(error); 
    }
};


export const updateWorkout = async (req, res, next) => {
    try {
        const { target, name, visibility } = req.body;
        const workoutId = req.params.workoutId;

        let workout = await Workout.findById(workoutId);

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found",
            });
        }

       
        if (target) workout.target = target;
        if (name) workout.name = name;
        if (visibility) workout.visibility = visibility;

        workout = await workout.save();

        res.status(200).json({
            success: true,
            message: "Workout updated successfully",
            data: workout,
        });
    } catch (error) {
        next(error);
    }
};


export const getWorkout = async (req, res, next) => {
    try {
        const workoutId = req.params.workoutId;

        const workout = await Workout.findById(workoutId);

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Workout retrieved successfully",
            data: workout,
        });
    } catch (error) {
        next(error);
    }
};
