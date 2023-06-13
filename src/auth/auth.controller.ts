import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { UserDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { PassportGuard } from 'src/guards/local.guard';
import { SessionGuard } from 'src/guards/session.guard';

@Controller('auth')
export class AuthController {
    constructor(private authSerive: AuthService) {}
    @Post('signup')
    signup(@Body() user: UserDto) {
        return this.authSerive.addUser(user);
    }
    @UseGuards(PassportGuard)
    @Post('login')
    @HttpCode(200)
    signin(@Req() req:Request) {
        return req.user
    }
    @UseGuards(SessionGuard)
    @Get('/logout')
    @HttpCode(204)
    logOUt(@Req() req:Request){
        req.logOut((err)=>{
            if(err) throw new UnauthorizedException(err)
        })
        return
    }
}
