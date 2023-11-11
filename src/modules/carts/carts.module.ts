import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CartsRepository } from './carts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './database/entity/carts.entity';
import { Products } from '../products/database/entity/products.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role-author.guard';
import { UserRepository } from '../users/users.repository';
import { Users } from '../users/database/entity/users.entity';
import { VerifyEmail } from '../verifyemail/database/entity/verifyEmail.entity';
import { Roles } from '../roles/database/entity/roles.entity';
import { ResetEmail } from '../reset-password/database/entity/resetpassword.entity';
import { Address } from '../addresses/database/entity/addresses.entity';


@Module({
  imports: [TypeOrmModule.forFeature( [Cart, Products, Users, VerifyEmail, Roles,ResetEmail, Address]), JwtModule], 
  controllers: [CartsController],
  providers: [CartsService, CartsRepository,AuthGuard,RolesGuard,UserRepository ]
})
export class CartsModule {}
