import {
    BadGatewayException,
    BadRequestException,
    Injectable,
    NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas';
import { PostDto, PostUpdateDto } from './post.dto';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
    //find all posta
    async findAll() {
        try {
            return await this.postModel
                .find()
                .populate('author')
                .sort({ updateAt: -1 });
        } catch (error) {
            throw new BadGatewayException(error.message);
        }
    }
    //find one
    async findById(id: string) {
        try {
            return await this.postModel
                .findById(id)
                .populate('author')
                .orFail(new Error('NO posts exists with such id: ' + id));
        } catch (error) {
            throw new BadGatewayException(error.message);
        }
    }
    //create one's post
    async createPost(loggedUserId:string,post: PostDto) {
        try {
            if(!loggedUserId) throw Error('No loggedUser found!')
            const { title, content} = post;
            return await this.postModel.create({
                title,
                content,
                author:loggedUserId,
            });
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }
    //create one's post
    async updatePost(id:string,updates: PostUpdateDto) {
        try {
            return await this.postModel.findByIdAndUpdate(id,updates)
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }
    //delete post
    async deletePost(id: string) {
        try {
            await this.postModel
                .findByIdAndDelete(id)
                .orFail(Error('Post does not  exists! with given id!'));
            return { success: true, message: 'Post is deleted at id: ' + id };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
