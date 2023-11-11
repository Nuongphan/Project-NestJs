import { Module } from '@nestjs/common';
import { VerifyemailController } from './verifyemail.controller';
import { VerifyemailService } from './verifyemail.service';
import { Address } from '../addresses/database/entity/addresses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyEmail } from './database/entity/verifyEmail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VerifyEmail])],
  controllers: [VerifyemailController],
  providers: [VerifyemailService]
})
export class VerifyemailModule {}
