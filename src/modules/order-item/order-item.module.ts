import { Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './database/entity/order-item.entity';
import { OrderItemRepository } from './order-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepository], 
})
export class OrderItemModule {}
