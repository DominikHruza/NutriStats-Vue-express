import {
  Entity,
  BaseEntity,
  OneToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meal } from './meal.entity';

@Entity()
export class MealStats extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Meal)
  @JoinColumn()
  meal: Meal;
}
