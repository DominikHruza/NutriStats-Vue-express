import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  IsNull,
} from 'typeorm';
import { Meal } from './meal.entity';

@Entity()
export class MealItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  item_id: string;
  @Column({ nullable: true })
  carbs: number;
  @Column({ nullable: true })
  protein: number;
  @Column({ nullable: true })
  fats: number;
  @Column({ nullable: true })
  calories: number;
}
