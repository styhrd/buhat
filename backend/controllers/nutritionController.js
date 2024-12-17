import Nutrition from '../models/nutritionModel'
import Food from '../models/foodModel'
import User from '../models/userModel'

export const createFood = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        const nutritionId= user.nutritionId
        const { name, calories } = req.body
        
        if (!name || !calories) {
            return res.status(404).json({
                success: false,
                message:"All fields are required"
            })
        }

        const food = await Food.create({
            name,calories
        })

        let nutrition = await Nutrition.findById(nutritionId)

        nutrition.foodLogs.push(food._id)

        await nutrition.save()

         res.status(201).json({
            success: true,
            message: "Food Created",
             data: food,
            
        })
    } catch (error) {
        next(error)
    }
}


