import {  Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [
        //load env files 🛅
        ConfigModule.forRoot(),
        //connect to mongodb 🍃
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: process.env.MONGO_LOCAL_URL,
            }),
        }),
        //route modules
        //auth/* 🔓
        AuthModule,
        //users/* 🙎‍♂️
        UserModule,
        //posts/* 📑
        PostModule,
    ],
})
export class AppModule {
    // configure(consumer:MiddlewareConsumer){
    //     consumer.apply(LoggerMiddleware)
    //     .forRoutes({
    //         path:'users/:id',
    //         method:RequestMethod.ALL
    //     })
    // }
}
