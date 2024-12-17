import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['saved', 'not saved'],
        default: 'not saved'
    },
    nutritionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nutrition', // Reference to the User model
        required: true, // Ensure every profile is associated with a user
    }
});

export default mongoose.model('Food', foodSchema);
