import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //global dto validation
    app.useGlobalPipes(new ValidationPipe());
    //enable cors
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    //enalbe session
    app.use(
        session({
            secret: process.env.COOKIE_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1800 * 1000 }, //30min
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session())
    await app.listen(3000);
}
bootstrap();
