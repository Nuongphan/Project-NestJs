import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './category.repositori';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './database/entity/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository]
})
export class CategoriesModule {}
