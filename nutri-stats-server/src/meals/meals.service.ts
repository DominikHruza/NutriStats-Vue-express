import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from 'src/meals/dto/create-meal.dto';
import { MealsFilterDto } from 'src/meals/dto/meals-filter.dto';
import { Meal } from './meal.entity';
import { MealRepository } from './meal.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(MealRepository)
    private mealRepository: MealRepository,
  ) {}

  getMeals(user: User): Promise<Meal[]> {
    return this.mealRepository.getMeals(user);
  }
  //   getMealById(id: string): Meal {
  //     const found = this.meals.find(meal => meal.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Meal with ID "${id}" not found!`);
  //     }
  //     return found;
  //   }
  createMeal(createMealDto: CreateMealDto, user: User): Promise<Meal> {
    return this.mealRepository.createMeal(createMealDto, user);
  }
  //   deleteMeal(id: string): void {
  //     const found = this.getMealById(id);
  //     this.meals.filter(meal => meal.id !== found.id);
  //   }
  //   updateMealStatus(id: string, status: MealStatus) {
  //     const meal = this.getMealById(id);
  //     meal.status = status;
  //     return meal;
  //   }
}
