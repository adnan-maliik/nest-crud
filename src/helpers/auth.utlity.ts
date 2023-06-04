// generate token payload

import {UserDocument } from "src/schemas";

export function generateTokenPayload(user:UserDocument) {
    return {
        id:user._id,
        name:user.firstname
    }
}

export function generateAccessPayload(isLoggedIn:boolean,token:string,user:UserDocument) {
        return {
            isLoggedIn,
            user,
            token
        }
}