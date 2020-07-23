const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealItemSchema = new Schema({
    name: String,
    edamamId: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    mealId: {
        type: Schema.Types.ObjectId,
        ref: 'meal'
    },
});

module.exports = MealItem = mongoose.model('meal-item', MealItemSchema )