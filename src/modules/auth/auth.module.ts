import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "../users/users.repository";
import { Users } from "../users/database/entity/users.entity";
import { Roles } from "../roles/database/entity/roles.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "../addresses/database/entity/addresses.entity";
import { VerifyEmail } from "../verifyemail/database/entity/verifyEmail.entity";
import { ResetEmail } from "../reset-password/database/entity/resetpassword.entity";
import { GoogleStrategy } from "./guard/google.strategy";
import { SessionSerializer } from "./guard/Serializer";
require("dotenv").config()

@Module({
  imports: [UsersModule, PassportModule.register({ defaultStrategy: 'google' }),PassportModule.register({ defaultStrategy: 'facebook' }), JwtModule.register({
    secret: process.env.ACCESS_TOKEN_SCERET
  }),
    TypeOrmModule.forFeature([Users, Roles, Address, VerifyEmail, ResetEmail])],
  providers: [AuthService, UserRepository, GoogleStrategy,SessionSerializer],
  controllers: [AuthController],
  exports: [PassportModule],
})

export class AuthModule { } 
