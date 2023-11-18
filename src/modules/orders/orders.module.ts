import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './database/entity/order.entity';
import { OrderItem } from '../order-item/database/entity/order-item.entity';
import { Products } from '../products/database/entity/products.entity';
import { Address } from '../addresses/database/entity/addresses.entity';
import { Cart } from '../carts/database/entity/carts.entity';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../users/users.repository';
import { Users } from '../users/database/entity/users.entity';
import { Roles } from '../roles/database/entity/roles.entity';
import { VerifyEmail } from '../verifyemail/database/entity/verifyEmail.entity';
import { ResetEmail } from '../reset-password/database/entity/resetpassword.entity';
import { ProductRepository } from '../products/products.repositori';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Products, Address, Cart,Users, Address, Roles, VerifyEmail, ResetEmail])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, MailService, UserRepository, ProductRepository]
})
export class OrdersModule {}
