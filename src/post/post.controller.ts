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
import { JwtGuard } from 'src/guards/auth.guard';

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

    @Post()
    @UseGuards(JwtGuard)
    createPost(@Body() post: PostDto, @User('id') loggedUserId: string) {
        return this.postService.createPost(loggedUserId, post);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    updatePost(@Param('id') id: string,@Body() updates:PostUpdateDto) {
        return this.postService.updatePost(id,updates);
    }
    @Delete(':id')
    @HttpCode(200)
    @UseGuards(JwtGuard)
    deletePost(@Param('id') id: string) {
        return this.postService.deletePost(id);
    }
}
