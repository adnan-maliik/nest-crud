import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const req=context.switchToHttp().getRequest()
    return req.isAuthenticated()
  }
}