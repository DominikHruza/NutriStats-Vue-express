import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRepository } from './meal.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MealItemRepository } from './meal-item.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MealRepository, MealItemRepository]),
    AuthModule,
  ],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
