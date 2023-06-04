// post dto

import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class PostDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    @MinLength(100)
    content: string;
}

export class PostUpdateDto {
    @IsNotEmpty()
    @IsOptional()
    title: string;
    @IsOptional()
    @IsNotEmpty()
    @MinLength(100)
    content: string;
}
