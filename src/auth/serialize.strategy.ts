import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportSerializer } from '@nestjs/passport';
import { Model} from 'mongoose';
import { User } from 'src/schemas';

// @Injectable()
export class SessionSerialzer extends PassportSerializer {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        super();
    }
    serializeUser(user: any, done: Function) {
        done(null, user.id);
    }
    deserializeUser(payload: any, done: Function) {
        this.userModel
            .findById(payload)
            .orFail(Error('No user found with payload!'))
            .then((user) => {
                done(null, user.toJSON());
            })
            .catch((err) => {
                done(err, null);
            });
    }
}
