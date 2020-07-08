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
import { UpdateMealDto } from 'src/meals/dto/update-meal.dto';
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

  @Get('/:id')
  getMealById(@Param('id') id: number, @GetUser() user: User): Promise<Meal> {
    return this.mealsService.getMealById(id, user);
  }

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

  //   @Patch('edit/:id')
  //   updateTaskStatus(
  //     @GetUser()
  //     user: User,
  //     @Param('id')
  //     id: number,
  //     @Body() updateMealDto: UpdateMealDto,
  //   ): Meal {
  //     return this.mealsService.updateMealStatus(id, updateMealDto, user);
  //   }
}
