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

    workoutsIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workouts'  // Reference to the Workouts model
    }],

    runningIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Running'  // Reference to the Running model
    }],

    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },

});

export default mongoose.model("User", userSchema)