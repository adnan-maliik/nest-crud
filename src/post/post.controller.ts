import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto, PostUpdateDto } from './post.dto';
import { User } from 'src/decorators/user.decorator';
import { SessionGuard } from 'src/guards/session.guard';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}
    @Get()
    findAll() {
        return this.postService.findAll();
    }
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.postService.findById(id);
    }

    @UseGuards(SessionGuard)
    @Post()
    createPost(@Body() post: PostDto, @User('id') loggedUserId: string) {
        return this.postService.createPost(loggedUserId, post);
    }

    @UseGuards(SessionGuard)
    @Put(':id')
    updatePost(@Param('id') id: string,@Body() updates:PostUpdateDto) {
        return this.postService.updatePost(id,updates);
    }
    @UseGuards(SessionGuard)
    @Delete(':id')
    @HttpCode(200)
    deletePost(@Param('id') id: string) {
        return this.postService.deletePost(id);
    }
}
