import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtService } from 'src/helpers';

@Module({
  imports:[
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      global:true,
    }),
    UserModule,
  ],
  providers: [AuthService,AuthJwtService],
  controllers: [AuthController]
})
export class AuthModule {}
