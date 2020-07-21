import { IsNotEmpty, IsEmpty } from 'class-validator';
import { IsNull } from 'typeorm';
import { Optional } from '@nestjs/common';

export class AddMealItemDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  item_id: string;
  @IsNotEmpty()
  meal_id: number;

  @Optional()
  carbs: number;
  @Optional()
  protein: number;
  @Optional()
  fats: number;
  @Optional()
  calories: number;
}
