
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
        
    }
}