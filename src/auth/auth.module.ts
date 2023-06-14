import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtService } from 'src/helpers';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            global: true,
        }),
        UserModule,
    ],
    providers: [
        AuthService,
        AuthJwtService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
    controllers: [AuthController],
})
export class AuthModule {}
