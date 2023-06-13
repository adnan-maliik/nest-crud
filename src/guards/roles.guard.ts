import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { ROLES_KEY, Roles } from "src/decorators/role.decorator";
import { ROLES } from "src/schemas";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    async canActivate(context:ExecutionContext):Promise<boolean>{
        const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          console.log(requiredRoles);
        if(!requiredRoles) return true
        //if any role provided then check for user roles
        const {user} = context.switchToHttp().getRequest()
        return requiredRoles.some(role=>user.role===role)
    }
}