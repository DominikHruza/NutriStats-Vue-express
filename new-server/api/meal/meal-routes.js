const express = require('express');
const router = express.Router();
const mealController = require('./meal-controller');
const tokenAuth = require('../../middleware/tokenAuth');


const {createMeal, getUserMeals, addMealItem, deleteMealItem} = mealController;

router.get('/', tokenAuth, getUserMeals);
router.post('/', tokenAuth, createMeal);
router.put('/', tokenAuth, addMealItem);
router.delete('/:itemId', tokenAuth, deleteMealItem);

module.exports = router;