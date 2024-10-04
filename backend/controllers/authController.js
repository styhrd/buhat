import userModel from "../models/userModel.js"

export const registerController = async (req, res) => {
    try {
        const { fullname, email, password } = req.body

        if (!fullname || !email || !password) {
            return res.status(400).send({ success: false, message: 'Please provide all Fields' })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registered"
            })
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
        console.log(error)
        res.status(400).send({
            message: "Error in Register",
            success: false,
            error
        })
    }
}