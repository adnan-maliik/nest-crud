import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class PassportGuard extends AuthGuard("local"){
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result= await super.canActivate(context)
        //call original login method
        const req=context.switchToHttp().getRequest()
        await super.logIn(req)
        // console.log('authOptions => ',super.getAuthenticateOptions(context));
        // console.log('result => ',result);
        return result as boolean
    }
}