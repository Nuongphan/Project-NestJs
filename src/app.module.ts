import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/mail/mail.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { VerifyemailModule } from './modules/verifyemail/verifyemail.module';
import { ResetPasswordModule } from './modules/reset-password/reset-password.module';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ImagesModule } from './modules/images/images.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PassportModule } from '@nestjs/passport';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { UploadMiddleware } from './middlewares/upload.middleware';
import { Csv1Module } from './modules/csv1/csv1.module';



require("dotenv").config()

@Module({ 
  imports: [
    TypeOrmModule.forRoot(Config), ConfigModule.forRoot({isGlobal: true}),  PassportModule.register({ session: true }), UsersModule, RolesModule, MailModule, 
    VerifyemailModule,ResetPasswordModule, ProductsModule,AuthModule,ImagesModule, CartsModule, OrderItemModule, OrdersModule, FavoritesModule,  MulterModule.registerAsync({
      useClass: UploadMiddleware }),Csv1Module ],
  controllers: [AppController],
  providers: [AppService], 
  
})

export class AppModule { } 
