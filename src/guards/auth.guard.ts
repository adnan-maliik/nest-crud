import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthJwtService } from 'src/helpers';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
// guard that verfies acccess token and allow users to access private resources
@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private jwtService: AuthJwtService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            //switch to http  mode
            let host = context.switchToHttp();
            // get request object
            let req = host.getRequest();
            //extract bearer token
            let token = req.headers.authorization?.split(' ')[1]
            console.log(req.headers.authorization);
            
            if (!token) throw Error('No Token found!');
            //verify token
            let extractedUser = await this.jwtService.verifyToken(
                token as string,
            );
            //found user
            let foundUser = await this.userModel
                .findById(extractedUser.id)
                .orFail(Error('Invalid Token!'));
            req['user'] = foundUser;
            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
