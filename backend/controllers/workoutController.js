import User from "../models/userModel.js"
import Workout from "../models/workoutModel.js"


export const shareWorkout = async (req, res, next) => {
    try {
        const code = req.params.code;

        // Find the workout by code
        const originalWorkout = await Workout.findOne({ code: code }).populate('exercises'); // Include exercises
        if (!originalWorkout) {
            return res.status(404).json({
                success: false,
                message: "No Workout Found",
            });
        }

        const userId = req.user.userId;

        // Check if the workout already exists in the user's workoutsIds
        const user = await User.findOne({
            _id: userId,
            workoutsIds: { $in: [originalWorkout._id] },
        });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Workout already exists in your list",
            });
        }

        // Duplicate the workout
        const newWorkout = await Workout.create({
            name: originalWorkout.name,
            target: originalWorkout.target,
            visibility: originalWorkout.visibility,
            createdBy: userId, // Set the new creator
            date: new Date(), // Set the current date
            code: originalWorkout.code, // Keep the same code
        });

        // Duplicate the exercises
        const newExercises = await Promise.all(
            originalWorkout.exercises.map(async (exercise) => {
                const newExercise = await Exercise.create({
                    sets: exercise.sets,
                    reps: exercise.reps,
                    weight: exercise.weight,
                    weightLogs: exercise.weightLogs,
                    note: exercise.note,
                    target: exercise.target,
                    workoutId: newWorkout._id, // Associate with the new workout
                });
                return newExercise._id; // Return the new exercise ID
            })
        );

        // Update the new workout with the duplicated exercises
        newWorkout.exercises = newExercises;
        await newWorkout.save();

        // Add the new workout to the user's workoutsIds
        await User.findByIdAndUpdate(userId, {
            $push: { workoutsIds: newWorkout._id },
        });

        res.status(201).json({
            success: true,
            message: "Workout successfully shared and copied",
            data: newWorkout,
        });
    } catch (error) {
        next(error);
    }
};


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

export const getAllWorkouts = async (req, res, next) => {
    try {
        const userId = req.user.userId

        const workouts = await Workout.find({ createdBy: userId })
        
        if (workouts.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No workouts found",
                data: [],
            });
        }


        res.status(200).json({
            success: true,
            message: "Workouts retrieved successfully",
            data: workouts,
        });



    } catch (error) {
        next(error)
    }
}

export const deleteWorkout = async (req, res, next) => {
    try {
        const { workoutId } = req.params
        const userId = req.user.userId
        const workout = await Workout.findOne({_id: workoutId})
        
        if (!workout) {
             return res.status(404).json({
                success: false,
                message: "Workout not found",
            });
        }
        
        await workout.deleteOne()
        await User.findByIdAndUpdate(
            userId, 
            { $pull: { workoutsIds: workoutId } }
        );


        res.status(200).json({
            success: true,
            message: "Workout Deleted successfully",
        });

    } catch (error) {
        next(error)
    }
}