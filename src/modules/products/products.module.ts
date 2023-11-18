import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './database/entity/products.entity';
import { Category } from '../categories/database/entity/categories.entity';
import { Images } from '../images/database/entity/images.entity';
import { ProductRepository } from './products.repositori';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Category, Images])],
  providers: [ProductsService,ProductRepository],
  controllers: [ProductsController],
  exports: [ProductRepository],
})
export class ProductsModule {}
