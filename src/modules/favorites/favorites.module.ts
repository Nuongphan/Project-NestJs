import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repositori';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './database/entity/favorites.entity';
import { UserRepository } from '../users/users.repository';
import { Users } from '../users/database/entity/users.entity';
import { RolesRepository } from '../roles/roles.repository';
import { Roles } from '../roles/database/entity/roles.entity';
import { Address } from '../addresses/database/entity/addresses.entity';
import { VerifyEmail } from '../verifyemail/database/entity/verifyEmail.entity';
import { ResetEmail } from '../reset-password/database/entity/resetpassword.entity';
import { Products } from '../products/database/entity/products.entity';
import { Images } from '../images/database/entity/images.entity';
import { Category } from '../categories/database/entity/categories.entity';
import { ProductRepository } from '../products/products.repositori';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Users, Roles, Address, VerifyEmail, ResetEmail, Products, Images, Category])],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository, UserRepository, ProductRepository ]
})
export class FavoritesModule {}
  