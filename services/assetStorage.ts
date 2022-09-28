import { randomUUID } from "crypto";
import multer from "multer";
import { extname, resolve } from "path";
import { readFile } from 'node:fs/promises';

export default function assetStorage() {

    const UPLOAD_DIR = "./public/uploads";

    const uploadMiddleware = multer({
        storage: multer.diskStorage({
            destination: UPLOAD_DIR,
            filename: (req, file, cb) =>
                cb(null, `${randomUUID()}${extname(file.originalname)}`),
        }),
    });
    return {
        saveSingleFromReq: uploadMiddleware.single('image'),
        readSingle: (filename: string) => readFile(resolve(UPLOAD_DIR, filename))
    }
}
