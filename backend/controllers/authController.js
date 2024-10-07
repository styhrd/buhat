import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if required fields are provided
        if (!fullname || !email || !password) {
            return next(new Error("Please fill all fields"));
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return next(new Error("User already registered"));
        }

        // Create the user
        const user = await userModel.create({ fullname, email, password });
        const token = user.createJWT();

        // Send success response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
            token
        });
    } catch (error) {
        next(error);
    }
};


export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return next(new Error("Please provide both email and password"));
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new Error("Invalid email or password"));
        }

        // Compare the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new Error("Invalid email or password"));
        }

        // Create JWT token and send response
        const token = user.createJWT();
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token
        });
    } catch (error) {
        // Log the full error to the console for debugging
        console.error('Error in loginController:', error);

        // Send a more specific error message in the response
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: error.message  // Include the error message in the response
        });
    }
};
