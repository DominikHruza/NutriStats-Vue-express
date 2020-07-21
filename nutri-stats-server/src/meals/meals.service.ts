import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from 'src/meals/dto/create-meal.dto';
import { MealsFilterDto } from 'src/meals/dto/meals-filter.dto';
import { Meal } from './meal.entity';
import { MealRepository } from './meal.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { UpdateMealDto } from './dto/update-meal.dto';
import { AddMealItemDto } from './dto/add-meal-item.dto';
import { MealItemRepository } from './meal-item.repository';
import { MealItem } from './meal-item.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(MealRepository)
    private mealRepository: MealRepository,
    @InjectRepository(MealItemRepository)
    private mealItemRepository: MealItemRepository,
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

  addMealItem(addMealItemDto: AddMealItemDto): Promise<MealItem> {
    return this.mealItemRepository.addItemToMeal(addMealItemDto);
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
