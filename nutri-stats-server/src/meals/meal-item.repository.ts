import { Repository, EntityRepository } from 'typeorm';
import { MealItem } from './meal-item.entity';
import { AddMealItemDto } from './dto/add-meal-item.dto';

@EntityRepository(MealItem)
export class MealItemRepository extends Repository<MealItem> {
  async addItemToMeal(addMealItemDto: AddMealItemDto): Promise<MealItem> {
    const {
      title,
      item_id,
      meal_id,
      carbs,
      protein,
      fats,
      calories,
    } = addMealItemDto;

    const mealItem = new MealItem();
    (mealItem.title = title),
      (mealItem.item_id = item_id),
      (mealItem.carbs = carbs),
      (mealItem.protein = protein),
      (mealItem.fats = fats),
      (mealItem.calories = calories);

    await mealItem.save();
    return mealItem;
  }

  async getMeals(mealId: number): Promise<MealItem[]> {
    const query = this.createQueryBuilder('meal_item');
    query.where('meal_item.meal_id = :mealId', {
      mealId: mealId,
    });

    const mealItems = await query.getMany();
    console.log('mealItems', mealItems);
    return mealItems;
  }
}
