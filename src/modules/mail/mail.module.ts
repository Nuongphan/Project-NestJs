import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'nuongnunga8@gmail.com',
          pass: 'rjca qiti frpc ajqv',
        },
      },
      defaults: {
        from:'Normandy Candles',
      },
      template: {
        dir: join("dist/mail/templates"),  
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },   
    }),
  ],
  controllers: [],
  providers: [MailService]
  
})

export class MailModule {}
