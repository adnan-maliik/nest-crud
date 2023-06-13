import * as bcrypt from 'bcryptjs';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export enum ROLES {
    Admin = 'admin',
    User = 'user',
}
//Use schema
@Schema(
    //schema config
    {
        toJSON: {
            virtuals: true,
            //delete user password
            transform(doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                return ret;
            },
        },
        versionKey: false,
    },
)
export class User {
    @Prop({ trim: true })
    firstname: string;
    @Prop({ trim: true })
    lastname: string;
    @Prop({ unique: true })
    email: string;
    @Prop()
    password: string;
    @Prop({ enum:ROLES, default: ROLES.User })
    role: string;
    @Prop()
    picUrl:string
}

// useful type inference
export type UserDocument = HydratedDocument<User>;

// schema factory
const UserSchema = SchemaFactory.createForClass(User);

//virtual property for getting fullName
UserSchema.virtual('fullName').get(function (): string {
    return this.firstname + ' ' + this.lastname;
});

//static method on Model for hashing password
UserSchema.statics.hashPassword = async function (plainPassword: string) {
    try {
        return bcrypt.hash(plainPassword, 10);
    } catch (error) {
        throw error;
    }
};
//static method on Model for decode/verify password
UserSchema.statics.verifyPassword = function (
    passwordInput: string,
    hash: string,
) {
    return bcrypt.compare(passwordInput, hash);
};

export { UserSchema };
