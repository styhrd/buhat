import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    caloriesConsumed: {
        type: Number,
        required: true,
        default: 0  // Will be calculated from foodLogs
    },

    foodLogs: {
        type: [{
            name: String,
            calories: Number
        }],
        required: true,
        default: []
    },

    status: {
        type: String,
        enum: ['Overeat', 'Undereat', 'Just Right'],
        required: true
    },

    savedFoods: {
        type: [{
            name: String,
            calories: Number
        }],
        default: []
    },

    calorieMaintenance: {
        type: Number,
        required: true  // This will be calculated based on user profile
    }
});

// Add a pre-save hook to calculate caloriesConsumed and update status based on calorieMaintenance
nutritionSchema.pre('save', function (next) {
    // Calculate total calories consumed from foodLogs
    this.caloriesConsumed = this.foodLogs.reduce((total, food) => total + food.calories, 0);

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
