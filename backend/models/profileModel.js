import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    activityLevel: {
        type: String,
        enum: ['no exercise', 'light', 'moderate', 'active', 'very active'],
        required: true
    },

    weightGoal: {
        type: Number,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, // Ensure every profile is associated with a user
    },

    weightLogs: {
        type: [Number],  // Define it as an array of numbers
        default: function () {
            return [this.weight];  // Default value is the initial weight
        },
    },
});

export default mongoose.model('Profile', profileSchema);
