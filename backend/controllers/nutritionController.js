import Nutrition from '../models/nutritionModel.js'
import Food from '../models/foodModel.js'
import User from '../models/userModel.js'

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
            name,calories,nutritionId
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

export const updateFood = async (req, res, next) => {
    try {
        const { name, calories } = req.body
        const foodId = req.params.foodId
        const user = await User.findById(req.user.userId)
        const nutritionId = user.nutritionId
        let nutrition = await Nutrition.findById(nutritionId)
        

        let food = await Food.findById(foodId)

        if (!food) { 
            return res.status(200).json({
                success: false,
                message:"Food Not Found"
            })
        }

        if (name) food.name = name
        if (calories) food.calories = calories
        
        food = await food.save()
        await nutrition.save()

        res.status(200).json({
            success: true,
            message: "Food Updated",
            data:food
        })
    } catch (error) {
        next(error)
    }
}

export const getFood = async (req, res, next) => {
    try {
        const foodId = req.params.foodId

        let food = await Food.findById(foodId)

        if (!food) {
            return res.status(404).json({
                success: false,
                message:"Food not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Food Fetched",
            data:food
        })
    } catch (error) {
        next(error)
    }
}

export const deleteFood = async (req, res, next) => {
    try {
        const foodId = req.params.foodId

        let food = await Food.findById(foodId)

        if (!food) {
            return res.status(404).json({
                success: false,
                message:"Food not Found"
            })
        }

        await food.deleteOne()

        await Nutrition.findByIdAndUpdate(
            food.nutritionId,
            {$pull:{foodLogs:foodId}}
        )

        res.status(200).json({
            success: true,
            message: "Food Deleted successfully",
        });
    } catch (error) {
        next(error)
    }
}

export const getAllFood = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const user = await User.findById(userId)
    
        const nutritionId = user.nutritionId

        const foods = await Food.find({ nutritionId: nutritionId })
        
        if (foods.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No food found",
                data: [],
            });
        }

        res.status(200).json({
            success: true,
            message: "Food retrieved successfully",
            data: foods,
        });
    } catch (error) {
        next(error)
    }

}

export const saveFood = async (req, res, next) => {
    try {
        const foodId = req.params.foodId
        const user = await User.findById(req.user.userId)
        const nutritionId = user.nutritionId
        const nutrition = await Nutrition.findById(nutritionId)
        
        
        if (nutrition.savedFoods.includes(foodId)) {
            nutrition.savedFoods.pull(foodId)
        } else {
            nutrition.savedFoods.push(foodId)
            
        }

        await nutrition.save()

        res.status(200).json({
            success: true,
            message:"Food Saved"
        })

    } catch (error) {
        next(error)
    }
} 

export const getSavedFood = async (req, res, next)=> {
    try {

        const user = await User.findById(req.user.userId)
        const nutritionId = user.nutritionId
        const nutrition = await Nutrition.findById(nutritionId).populate({
            path: "savedFoods",
            model:"Food"
        })

        

        if (!nutrition) {
             return res.status(404).json({
                success: false,
                message: "Nutrition not found",
            });
        }


        res.status(200).json({
            success: true,
            likes: nutrition.savedFoods, 
        });
    } catch (error) {
        next(error)
    }
}

