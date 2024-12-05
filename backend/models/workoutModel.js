import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    exercises: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Exercise',
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    target: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, // Ensure every profile is associated with a user
    },
    code: {
        type: String,
        required: true,
        default: () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let code = '';
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                code += characters[randomIndex];
            }
            return code;
        }
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'restricted'], // Example values for visibility
        default: 'private'
    }
});

export default mongoose.model("Workout", workoutSchema);
