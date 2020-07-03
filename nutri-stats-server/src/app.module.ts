import { Module } from '@nestjs/common';
import { MealsModule } from './meals/meals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), MealsModule, AuthModule],
})
export class AppModule {}
