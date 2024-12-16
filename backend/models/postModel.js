import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        enum: ["public", "private", "restricted"],
        default: "private",
    },
    date: {
        type: Date,
        default:Date.now
    },
    createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
    },
    

})

export default mongoose.model("Post", postSchema)