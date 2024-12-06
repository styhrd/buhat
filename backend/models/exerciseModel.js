import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    sets: {
        type: Number,
        required:true
    },
    reps: {
        type: [Number],
        required:true,
    },
    weight: {
        type: Number,
        required: true
    },
    weightLogs: {
        type: [Number],  // Define it as an array of numbers
        default: function () {
            return [this.weight];  // Default value is the initial weight
        },
    },
    note: {
        type:String
    },
    target: {
        type: String,
        enum: ['Neck', 'Shoulders', 'Traps', 'Side Delts', 'Front Delts', 'Rear Delts', 'Biceps', 'Triceps', 'Forearms', 'Core', 'Upper Chest', 'Middle Chest', 'Lower Chest', 'Chest', 'Quads', 'Glutes', 'Hamstrings', 'Calves'],
        required: true
    },
    workoutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout', 
        required: true, 
    }
})

export default mongoose.model("Exercise", exerciseSchema)
