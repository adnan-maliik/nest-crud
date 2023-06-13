import {
  Controller,
  Get,
  Delete,
  Param,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from 'src/auth/auth.dto';
import { SessionGuard } from 'src/guards/session.guard';

@Controller('users')
@UseGuards(SessionGuard)
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    // GET user/
    findAll() {
        return this.userService.findAll();
    }
    // get unique user
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }
    //delete user by id
    @Put(':id')
    updateUser(@Param('id') id: string,@Body() updates:UserUpdateDto) {
        return this.userService.updateUser(id,updates);
    }
    //delete user by id
    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
