

import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';




export class CredentialsDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @MinLength(5)
    password: string;
}


export class UserDto extends CredentialsDto {
    @IsNotEmpty()
    firstname: string;
    @IsNotEmpty()
    lastname: string;
}


export class UserUpdateDto{
    @IsOptional()
    @IsEmail()
    email:string
    @IsOptional()
    @IsNotEmpty()
    firstname:string
    @IsOptional()
    @IsNotEmpty()
    lastname:string
}