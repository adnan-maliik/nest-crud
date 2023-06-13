import { ROLES } from "src/schemas"
import  {SetMetadata} from "@nestjs/common"

export const ROLES_KEY="user_role"

export const Roles=(...roles:ROLES[])=>{
    return SetMetadata(ROLES_KEY,roles)
}
//👉 https://docs.nestjs.com/security/authorization