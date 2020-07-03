import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { MealStatus } from './meal-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Meal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @Column()
  status: MealStatus;

  @Column()
  carbs: number;

  @Column()
  protein: number;

  @Column()
  fats: number;

  @Column()
  totalKcal: number;

  @ManyToOne(
    type => User,
    user => user.meals,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}
