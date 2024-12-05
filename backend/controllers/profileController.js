import Profile from '../models/profileModel.js'
import User from '../models/userModel.js'

export const createProfile = async (req, res, next) => {
    try {
        const { age, weight, height, description, activityLevel, weightGoal, weightLogs } = req.body;

        if (!age || !weight || !height || !description || !activityLevel || !weightGoal) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        let user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.profileId) {
            return res.status(400).json({
                success: false,
                message: "Profile already exists",
            });
        }

        const profile = await Profile.create({
            age,
            weight,
            height,
            description,
            activityLevel,
            weightGoal,
            weightLogs,
            createdBy: user._id,
        });

        user.profileId = profile._id;
        await user.save();

        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};


export const updateProfile = async (req, res, next) => {
    try {
        const { age, weight, height, description, activityLevel, weightGoal } = req.body;
        const profileId = req.params.profileId;

        let profile = await Profile.findById(profileId);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        if (profile.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this profile",
            });
        }

        const fieldsToUpdate = { age, weight, height, description, activityLevel, weightGoal };
        for (let field in fieldsToUpdate) {
            if (fieldsToUpdate[field] !== undefined) {
                profile[field] = fieldsToUpdate[field];
            }
        }

        if (weight) {
            profile.weightLogs.push(weight);
        }

        profile = await profile.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};



export const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const profile = await Profile.findOne({ createdBy: userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};
