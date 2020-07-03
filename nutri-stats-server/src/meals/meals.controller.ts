import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from 'src/meals/dto/create-meal.dto';
import { MealsFilterDto } from 'src/meals/dto/meals-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { Meal } from './meal.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('meals')
@UseGuards(AuthGuard())
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get()
  getMeals(@GetUser() User: User): Promise<Meal[]> {
    return this.mealsService.getMeals(User);
  }

  //   @Get('/:id')
  //   getMealById(@Param('id') id: string): Meal {
  //     return this.mealsService.getMealById(id);
  //   }

  @Post()
  @UsePipes(ValidationPipe)
  createMeal(
    @Body() createMealDto: CreateMealDto,
    @GetUser() user: User,
  ): Promise<Meal> {
    return this.mealsService.createMeal(createMealDto, user);
  }

  //   @Delete('/:id')
  //   deleteMeal(@Param('id') id: string): void {
  //     this.mealsService.deleteMeal(id);
  //   }

  //   @Patch('/:id/status')
  //   updateTaskStatus(
  //     @Param('id') id: string,
  //     @Body('status') status: MealStatus,
  //   ): Meal {
  //     return this.mealsService.updateMealStatus(id, status);
  //   }
}
