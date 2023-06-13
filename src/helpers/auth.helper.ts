import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type Payload=Record<string, any>

@Injectable()
export class AuthJwtService {
    constructor(private jwtService: JwtService) {}
    getAccessToken(payload: Payload, expiresIn:string='1hr'):Promise<string> {
        return this.jwtService.signAsync(payload,{
            expiresIn,
            secret:process.env.JWT_SECRET
        });
    }
    getRefreshToken(payload: Payload, expiresIn:string='1day'):Promise<string> {
        return this.jwtService.signAsync(payload,{
            expiresIn,
            secret:process.env.JWT_SECRET
        });
    }
    verifyToken(token:string):Promise<any>{
        return this.jwtService.verifyAsync(token,{
            ignoreExpiration:false,
            secret:process.env.JWT_SECRET
        })
    }
        
}
