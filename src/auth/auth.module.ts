import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth.startegy';
import { SessionSerialzer } from './serialize.strategy';

@Module({
    imports: [PassportModule.register({
        session:true,
    }), UserModule],
    providers: [AuthService,LocalStrategy,SessionSerialzer],
    controllers: [AuthController],
})
export class AuthModule {}
