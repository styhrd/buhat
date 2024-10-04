import userModel from "../models/userModel.js"

export const registerController = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body

        if (!fullname || !email || !password) {
            next("Please Fill all Fields")
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            next("Already Registered")
        }

        const user = await userModel.create({ fullname, email, password })
        if (user) {
            return res.status(201).send({
                success: true,
                message: "User Registered",
                user
            })
        }

    } catch (error) {
        next(error)
    }
}