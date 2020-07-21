import { IsNotEmpty, IsEmpty } from 'class-validator';
import { MealStatus } from '../meal-status.enum';

export class CreateMealDto {
  title: string;

  @IsNotEmpty()
  status: MealStatus;

  carbs: number;

  fats: number;

  protein: number;

  totalKcal: number;
}
