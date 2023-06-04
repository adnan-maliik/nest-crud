import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
@Schema(
    //default options
    { versionKey: false, timestamps: true, toJSON: { virtuals: true } },
)
export class Post {
    @Prop({ required: true })
    title: string;
    @Prop({ minlength: 100 })
    content: string;
    //define relation one-to-many
    @Prop({ ref: 'User', type: 'ObjectId' ,required:true})
    author: User;
}

// schema factory
export const PostSchema=SchemaFactory.createForClass(Post)
