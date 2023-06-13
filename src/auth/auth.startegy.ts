//implement passport local strategy
import { Injectable, NotAcceptableException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,"local") {
    constructor(private authSerive:AuthService) {
        super({
            usernameField: 'email',
            passwordField:"password"
        });
    }
    async validate(email: string, password: string) {
        try {
            const user=await this.authSerive.validateCredentials(email,password)
            return user
        } catch (error) {
            throw new NotAcceptableException(error.message)
        }
    }    
}
