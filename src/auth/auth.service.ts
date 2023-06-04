import {
    ForbiddenException,
    Injectable,
    NotAcceptableException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas';
import { CredentialsDto, UserDto } from './auth.dto';
import { AuthJwtService } from '../helpers';
import {  Response } from 'express';
import {
    generateAccessPayload,
    generateTokenPayload,
} from 'src/helpers/auth.utlity';

// @Injectable({scope:Scope.REQUEST,durable:true})
@Injectable()
export class AuthService {
    constructor(
        // @Inject(REQUEST) private req:Request,
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: AuthJwtService,
    ) {}
    //create new user
    async addUser(user: UserDto) {
        try {
            let newUser: Record<string, string> = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            };
            //@ts-ignore
            let hashPassword = await this.userModel.hashPassword(user.password);
            newUser.password = hashPassword;
            return await this.userModel.create(newUser);
        } catch (error) {
            if (error.code === 11000)
                error = new Error('Email is already registerd!');
            throw new NotAcceptableException(error.message);
        }
    }
    //login
    async signin(credentials: CredentialsDto, res: Response) {
        try {
            let foundUser = await this.userModel
                .findOne({ email: credentials.email })
                .orFail(Error('Email is not registerd yet!'));
            //@ts-ignore
            let isMatch = await this.userModel.verifyPassword(
                credentials.password,
                foundUser.password,
            );
            if (!isMatch) throw Error('Password incorrect!');

            let tokenPayload = generateTokenPayload(foundUser);
            let accessToken = await this.jwtService.getAccessToken(
                tokenPayload,
            );

            //generate refresh token
            let refreshToken = await this.jwtService.getRefreshToken(
                tokenPayload,
            );
            //save this token to cookies
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                signed: true,
                sameSite: 'none',
                maxAge: 1 * 24 * 3600 * 1000, // 1 day,
                // secure: true  // enable it when using client framework
            });
            return generateAccessPayload(true, accessToken, foundUser);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    // refresh access token
    async refreshToken(cookies:any) {
        try {
            //get refresh token from signed cookies
            let refreshToken = cookies['jwt'];
            if (!refreshToken) throw Error('No Refresh token found!');
            //get token and verfiy it
            let extractedUser = await this.jwtService.verifyToken(refreshToken);
            //find user in database
            let foundUser = await this.userModel
                .findById(extractedUser.id)
                .orFail(Error('No User found!'));
            //generate new access token
            let accessToken = await this.jwtService.getAccessToken(
                generateTokenPayload(foundUser),
            );

            return generateAccessPayload(true, accessToken, foundUser);
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
