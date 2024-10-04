import mongoose from "mongoose";
import Profile from './profileModel.js';  // Import the Profile model

const nutritionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    caloriesConsumed: {
        type: Number,
        default: 0  // Will be calculated from foodLogs
    },

    foodLogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',  // Reference the Food model
    }],

    status: {
        type: String,
        enum: ['Overeat', 'Undereat', 'Just Right'],
    },

    savedFoods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',  // Reference the Food model
        default: []
    }],

    calorieMaintenance: {
        type: Number,
        required: true  // This will be calculated based on user profile
    },

    // Reference the user's profile
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    }
});

// Example pre-save hook for calculating caloriesConsumed and calorieMaintenance
nutritionSchema.pre('save', async function (next) {
    // Populate foodLogs to access calories from referenced Food documents
    await this.populate('foodLogs').execPopulate();

    // Calculate total calories consumed from foodLogs
    this.caloriesConsumed = this.foodLogs.reduce((total, food) => total + food.calories, 0);

    // Populate the user's profile to access age, weight, height, and activityLevel
    const profile = await Profile.findById(this.profile);

    if (!profile) {
        return next(new Error('Profile not found'));
    }

    // Calculate calorieMaintenance based on the user's profile
    const { age, weight, height, activityLevel } = profile;

    // Example formula for calorie maintenance calculation (Harris-Benedict Equation)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // BMR for men
    let activityMultiplier = 1.2;  // Default for 'no exercise'

    switch (activityLevel) {
        case 'light':
            activityMultiplier = 1.375;
            break;
        case 'moderate':
            activityMultiplier = 1.55;
            break;
        case 'active':
            activityMultiplier = 1.725;
            break;
        case 'very active':
            activityMultiplier = 1.9;
            break;
    }

    // Calculate calorieMaintenance
    this.calorieMaintenance = bmr * activityMultiplier;

    // Determine status based on calorieMaintenance and caloriesConsumed
    if (this.caloriesConsumed > this.calorieMaintenance) {
        this.status = 'Overeat';
    } else if (this.caloriesConsumed < this.calorieMaintenance) {
        this.status = 'Undereat';
    } else {
        this.status = 'Just Right';
    }

    next();
});

export default mongoose.model('Nutrition', nutritionSchema);
