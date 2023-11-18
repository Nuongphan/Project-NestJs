import { Module } from '@nestjs/common';
import { Csv1Controller } from './csv1.controller';
import { Csv1Service } from './csv1.service';
import { Csv1Repository } from './csv1.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/database/entity/products.entity';
import { UploadMiddleware } from 'src/middlewares/upload.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { Images } from '../images/database/entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Products, Images]), MulterModule.registerAsync({
    useClass: UploadMiddleware
  }),],
  controllers: [Csv1Controller],
  providers: [Csv1Service, Csv1Repository]
})
export class Csv1Module {}
