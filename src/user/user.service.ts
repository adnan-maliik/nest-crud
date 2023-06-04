import {
    BadGatewayException,
    BadRequestException,
    Injectable,
    NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas';
import { Model } from 'mongoose';
import { UserUpdateDto } from 'src/auth/auth.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async findAll() {
        const users = await this.userModel.find();
        try {
            return users;
        } catch (error) {
            throw new BadGatewayException(error.message);
        }
    }
    async findById(id: string) {
        try {
            const user = await this.userModel.findById(id);
            return user;
        } catch (error) {
            throw new BadGatewayException(error.message);
        }
    }
    async updateUser(id: string,updates:UserUpdateDto) {
        try {
            const user = await this.userModel.findByIdAndUpdate(id,updates,{new:true});
            return user;
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }
    async deleteUser(id: string) {
        try {
            await this.userModel
                .deleteOne({ _id: id })
                .orFail(new Error("User doesn't exist!"));
            return { success: true, message: 'User deleted with ' + id };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
