import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport'
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
  };
  app.enableCors(corsOptions);
  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: true,
      resave: true,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);

}

bootstrap();
