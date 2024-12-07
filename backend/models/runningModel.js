import mongoose from "mongoose";

const runningSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    visibility: {
        type: String,
        enum: ["public", "private", "restricted"],
        default: "private",
    },
    distance: {
        type: Number, 
        
    },
    time: {
        type: String, 
        
    },
    pace: {
        type: String, 
    },
});


function timeStringToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}


runningSchema.pre("save", function (next) {
    if (this.distance > 0 && this.time) {
        const totalSeconds = timeStringToSeconds(this.time);
        const paceInSeconds = totalSeconds / this.distance;
        const minutes = Math.floor(paceInSeconds / 60);
        const seconds = Math.round(paceInSeconds % 60);
        this.pace = `${minutes}:${seconds < 10 ? "0" : ""}${seconds} min/km`;
    } else {
        this.pace = "N/A";
    }
    next();
});

export default mongoose.model("Running", runningSchema);
