import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { CloudinaryProvider } from 'src/modules/images/cloudynary.provider';
import { ImagesRepository } from './images.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './database/entity/images.entity';
import { ImagesService } from './images.service';
import { Products } from '../products/database/entity/products.entity';
import { Category } from '../categories/database/entity/categories.entity';
import { ProductsModule } from '../products/products.module';
import { ProductRepository } from '../products/products.repositori';


@Module({
  
  imports:[TypeOrmModule.forFeature([Images, Products, Category])],
  controllers: [ImagesController],
  providers: [CloudinaryProvider,ImagesRepository,ImagesService, ProductRepository]

})

export class ImagesModule {}
 