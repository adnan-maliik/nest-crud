import { Body, Controller, HttpCode, Post ,Get,Res} from '@nestjs/common';
import { CredentialsDto, UserDto } from './auth.dto';
import { AuthService } from './auth.service';
import {  Response } from 'express';
import { Cookie } from 'src/decorators/cookies.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authSerive:AuthService){}
    @Post('signup')
    signup(@Body() user:UserDto){
        return this.authSerive.addUser(user)
    }
    @Post('signin')
    @HttpCode(200)
    signin(@Body() credentials:CredentialsDto,@Res({passthrough:true}) res:Response){
        return this.authSerive.signin(credentials,res)
    }
    @Get('refresh')
    refreshToken(@Cookie() cookies){
        return this.authSerive.refreshToken(cookies)
    }
}
