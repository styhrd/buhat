import mongoose from "mongoose";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';  // Using bcryptjs as intended

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
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

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to create a JWT token
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

// Method to compare passwords
userSchema.methods.comparePassword = async function (userPass) {
    return bcrypt.compare(userPass, this.password);  // Simply return the comparison result
}

export default mongoose.model("User", userSchema);
