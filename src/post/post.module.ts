import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas';
import { AuthJwtService } from 'src/helpers';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ],
    providers: [
        PostService,
        AuthJwtService
    ],
    controllers: [PostController],
})
export class PostModule {}
