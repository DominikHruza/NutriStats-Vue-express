import { EntityRepository, Repository } from 'typeorm';
import { Meal } from './meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Meal)
export class MealRepository extends Repository<Meal> {
  async getMeals(user: User): Promise<Meal[]> {
    const { id } = user;
    const query = this.createQueryBuilder('meal');
    query.where('meal.userId = :userId', { userId: id });

    const meals = await query.getMany();

    return meals;
  }

  async createMeal(createMealDto: CreateMealDto, user: User): Promise<Meal> {
    const { title, status, carbs, fats, protein, totalKcal } = createMealDto;

    const meal = new Meal();
    meal.title = title;
    meal.status = status;
    meal.user = user;
    meal.carbs = carbs;
    meal.fats = fats;
    meal.protein = protein;
    meal.totalKcal = totalKcal;
    await meal.save();

    delete meal.user;
    return meal;
  }
}