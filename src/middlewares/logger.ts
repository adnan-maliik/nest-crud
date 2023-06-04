// define middleware

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
        
        console.log('Request...',req.url);
        console.log('Request...',req.method);
        console.log('Request...',req.body);
        if(2==2) throw Error('error handling checking')
        next();
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
  }
}
