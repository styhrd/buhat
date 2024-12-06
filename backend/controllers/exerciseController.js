
import Exercise from '../models/exerciseModel.js'
import Workout from '../models/workoutModel.js'

export const createExercise = async (req, res, next) => {
    try {
        const {sets,reps,weight,weightLogs,note,target,workoutId } = req.body

        if (!sets || !reps || !weight || !note || !target) {
            return res.status(404).json({
                success: false,
                message:"All fields are required"
            })
        }

        const exercise = await Exercise.create({
            sets,
            reps,
            weight,
            weightLogs,
            note,
            target,
            workoutId
        })

        let workout = await Workout.findById(workoutId)

        workout.exercises.push(exercise._id)
        await workout.save()

        res.status(201).json({
            success: true,
            message: "Exercise Created",
            data:workout
        })
        
    } catch (error) {
        next(error)
    }

}


export const updateExercise = async (req, res, next) => {
    try {
        const { sets, reps, weight, note, target } = req.body;
        const exerciseId = req.params.exerciseId;

        let exercise = await Exercise.findById(exerciseId);

        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: "Exercise Not Found",
            });
        }

    
        if (sets !== undefined) {
            exercise.sets = sets;
        }
        if (reps !== undefined) {
            exercise.reps = reps;
        }
        if (weight !== undefined) {
            exercise.weight = weight;
            exercise.weightLogs.push(weight); 
        }
        if (note !== undefined) {
            exercise.note = note;
        }
        if (target !== undefined) {
            exercise.target = target;
        }

        
        exercise = await exercise.save();

        
        res.status(200).json({
            success: true,
            message: "Exercise updated successfully",
            data: exercise,
        });
    } catch (error) {
        next(error);
    }
};

export const exerciseGetbyId = async (req, res, next) => {
    try {
        const exerciseId = req.params.exerciseId

        let exercise = await Exercise.findById(exerciseId);

        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: "Exercise Not Found",
            });
        }

         res.status(200).json({
            success: true,
            message: "Exercise Feteched successfully",
            data: exercise,
        });

    } catch (error) {
        next(error)
    }
}

export const deleteExercise = async (req, res, next) => {
    try {
        const exerciseId = req.params.exerciseId
        const exercise = await Exercise.findOne({ _id: exerciseId });
        console.log(Exercise);
        
        
        
        if (!exercise) {
                 return res.status(404).json({
                    success: false,
                    message: "Exercise not found",
                });
        }
        
        await exercise.deleteOne()
        await Workout.findByIdAndUpdate(
            exercise.workoutId,
            {$pull:{exercises:exerciseId}}
        )

        res.status(200).json({
            success: true,
            message: "Exercise Deleted successfully",
        });
    } catch (error) {
        next(error)
    }
}
//getAllexercises
//delete