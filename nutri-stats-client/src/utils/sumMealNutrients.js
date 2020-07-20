export const sumMealNutrients = (items) => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    items.forEach(item => {
         calories += item.calories;
         protein += item.protein;
         carbs += item.carbs;
         fats += item.fats;
    })

    return {
        calories: parseFloat(calories.toFixed(2)),
        protein: parseFloat(protein.toFixed(2)),
        carbs: parseFloat(carbs.toFixed(2)),
        fats: parseFloat(fats.toFixed(2))
    }
}