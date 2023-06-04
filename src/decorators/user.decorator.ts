//extract req.user

import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User=createParamDecorator(
    (data:any,ctx:ExecutionContext)=>{
        let request=ctx.switchToHttp().getRequest()
        //extract user
        let loggedUser=request['user']
        //if needed any property like loggedUser[id]
        return data?loggedUser[data]:loggedUser
    }
)