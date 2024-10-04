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
    }
});

export default mongoose.model('Food', foodSchema);
