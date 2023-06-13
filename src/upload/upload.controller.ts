import {
  Controller,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Get,
  Param,
  Res,
  BadGatewayException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Model } from 'mongoose';
import { diskStorage } from 'multer';
import { join } from 'path';
import { JwtGuard } from 'src/guards/auth.guard';
import { editFileName } from 'src/helpers';
import { User } from 'src/schemas';
import {User as UserDec} from "src/decorators/user.decorator"

@Controller('upload')
export class UploadController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  @Put()
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: diskStorage({
        destination: join(__dirname, 'static'),
        filename: editFileName,
      }),
    }),
  )
  async uploadPic(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2 * 1024 * 1024,
            message(_maxSize) {
              return 'Max file size is 2MB!';
            },
          }),
          new FileTypeValidator({ fileType: /image\/jpg|png|jpeg/ }),
        ],
      }),
    )

    file: Express.Multer.File,
    @UserDec('id') id:string
  ) {
      try {
        return await this.userModel.findByIdAndUpdate(id,{
            //append your api domain example.com/upload/images/profile.jpg
            picUrl:`/upload/images/${file.filename}`
        },{new:true}).orFail(Error("No User exists"))
      } catch (error) {
        throw new BadGatewayException(error.message)
      }
  }

  @Get('images/:imageName')
  serverImageFile(@Param('imageName') imageName: string, @Res() res: Response) {
    const filePath = join(__dirname, 'static', imageName);
    res.sendFile(filePath);
  }
}
