const express = require('express');
const router = express.Router();
const Meal = require('../meal/meal-entity');
const User = require('../auth/user-entitiy')
const MealItem = require('../meal/meal-item.entity');
const { post } = require('./meal-routes');


exports.getUserMeals = async (req, res) => {
    try {
        const {id} = req.user;
        console.log(id)
        const {currentDate} = req.query;
     
        const userMeals = await User
            .findById(id)
            .populate({
                    path: 'meals',
                    match: { createdAt: { $eq: currentDate }},
                    populate: {path: 'items'}
                 })
            .select('-username')
            .select('-password');
        
        res.status(200).json(userMeals); 
            
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error!");
    }
}


exports.createMeal = async (req, res) => {
   
    try {
        const {id} = req.user;
        //Get current user and create meal
        const user = await User.findById(id).select('-password');
        const newMeal = new Meal(req.body);
        
        //Add user to meal
        newMeal.user = user;
        await newMeal.save();
        
        //Save meal to user
        user.meals.push(newMeal);
        await user.save()
    
        res.status(201).send(newMeal)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error!");
    }
}


exports.addMealItem = async (req, res) => {
    try {
        const {mealId} = req.query;
        //Add meal item
        const mealItem = new MealItem(req.body);
        mealItem.mealId = mealId;
        mealItem.itemId = await mealItem.save();
        
        console.log(mealItem.itemId);
        
        //Save item to meal
        const meal = await Meal.findById(mealId);
        meal.items.push(mealItem);
        await meal.save()

        res.status(200).send(mealItem);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error!")
    }
}

exports.deleteMealItem = async (req, res) => {
    try {
       const mealItem = await MealItem.findById(req.params.itemId);

       if(!mealItem)   {
            return res.status(401).json({msg: 'Meal item not found!'});
       } 

       await mealItem.remove(); 
       res.json({msg: 'Meal item deleted!', itemId:req.params.itemId });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error!")
    }
}