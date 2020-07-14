import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from 'src/meals/dto/create-meal.dto';
import { MealsFilterDto } from 'src/meals/dto/meals-filter.dto';
import { Meal } from './meal.entity';
import { MealRepository } from './meal.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(MealRepository)
    private mealRepository: MealRepository,
  ) {}

  getMeals(user: User, date: string): Promise<Meal[]> {
    console.log(date);
    return this.mealRepository.getMeals(user, date);
  }
  async getMealById(id: number, user: User): Promise<Meal> {
    const found = await this.mealRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Meal with ID "${id}" not found!`);
    }
    return found;
  }

  createMeal(createMealDto: CreateMealDto, user: User): Promise<Meal> {
    return this.mealRepository.createMeal(createMealDto, user);
  }
  //   deleteMeal(id: string): void {
  //     const found = this.getMealById(id);
  //     this.meals.filter(meal => meal.id !== found.id);
  //   }
  //   updateMealStatus(
  //     id: number,
  //     updateMealDto: UpdateMealDto,
  //     user: User,
  //   ): Promise<Meal> {
  //     const meal = this.getMealById(id, user);
  //     meal.status = status;
  //     return meal;
  //   }
}
