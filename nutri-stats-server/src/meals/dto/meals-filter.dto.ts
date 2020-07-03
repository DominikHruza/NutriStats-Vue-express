import { MealStatus } from 'src/meals/meal-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class MealsFilterDto {
  @IsOptional()
  @IsIn([
    MealStatus.BREAFAST,
    MealStatus.DINNER,
    MealStatus.LUNCH,
    MealStatus.SNACK,
  ])
  status: MealStatus;

  @IsOptional()
  @IsNotEmpty()
  searchUserId: number;
}
