import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from "cookie-parser"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //global dto validation
  app.useGlobalPipes(new ValidationPipe())
  //enable cors
  app.enableCors({
    origin:"*",
    credentials:true,
  })
  //for signed cookies
  app.use(cookieParser(process.env.COOKIE_SECRET))
  await app.listen(3000);
}
bootstrap();
