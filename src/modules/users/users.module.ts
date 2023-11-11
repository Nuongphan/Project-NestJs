import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './database/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { Roles } from '../roles/database/entity/roles.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role-author.guard';
import { Address } from '../addresses/database/entity/addresses.entity';
import { MailService } from '../mail/mail.service';
import { VerifyEmail } from '../verifyemail/database/entity/verifyEmail.entity';
import { ResetEmail } from '../reset-password/database/entity/resetpassword.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Roles,Address,VerifyEmail, ResetEmail]),JwtModule],
  controllers: [UsersController],
  providers: [UsersService,UserRepository,AuthGuard,RolesGuard, MailService  ]

})

export class UsersModule {}
 