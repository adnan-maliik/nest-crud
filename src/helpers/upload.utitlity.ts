/// edit file name

import { Request } from "express";
import { extname } from "path";
import {randomUUID} from "crypto"

export function editFileName(
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
): void {
    console.log(file.originalname);
    callback(null,`${randomUUID()}${extname(file.originalname)}`)
}