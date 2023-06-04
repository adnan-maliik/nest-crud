// extract signed cookies
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
export const Cookie = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        let request = ctx.switchToHttp().getRequest();
        return request.signedCookies;
    },
);
