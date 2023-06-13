import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas';
import { UserDto } from './auth.dto';

// @Injectable({scope:Scope.REQUEST,durable:true})
@Injectable()
export class AuthService {
    constructor(
        // @Inject(REQUEST) private req:Request,
        @InjectModel(User.name) private userModel: Model<User>,
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
    async validateCredentials(email:string,password:string){
        try {
            // find one's uer
            let foundUser = await this.userModel
                .findOne({ email })
                .orFail(Error('Email is not registerd yet!'));
            //@ts-ignore
            let isMatch = await this.userModel.verifyPassword(
                password,
                foundUser.password,
            );
            if (!isMatch) throw Error('Password incorrect!');
            return foundUser.toJSON()
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }
}
