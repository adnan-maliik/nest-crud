import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { AuthJwtService } from 'src/helpers';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        UserModule
    ],
    controllers: [UploadController],
    providers: [AuthJwtService],
})
export class UploadModule {}
