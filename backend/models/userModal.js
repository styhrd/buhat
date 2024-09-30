import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        requred: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },

    nutritionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nutrition'
    },

    workoutsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workouts'
    },

    runningId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Running'
    },

    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },

});

export default mongoose.model("User", userSchema)