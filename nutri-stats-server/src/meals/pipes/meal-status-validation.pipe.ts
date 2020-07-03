import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { MealStatus } from 'src/meals/meal-status.enum';
export class MaealStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    MealStatus.BREAFAST,
    MealStatus.LUNCH,
    MealStatus.DINNER,
    MealStatus.SNACK,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isStausValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStausValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
