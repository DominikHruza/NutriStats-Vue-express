const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    mealType: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'meal-item'
    }],
    createdAt:{ 
        type: String, 
        default: new Date().toISOString().slice(0, 10)
    }
});

module.exports = Meal = mongoose.model('meal', MealSchema )