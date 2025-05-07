// src/common/upload.config.ts
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const imageUploadOptions = {
    storage: diskStorage({
        destination: join(__dirname, '../../uploads'),
        filename: (_req, file, cb) => {
            const rnd = `${Date.now()}-${Math.round(Math.random()*1e9)}`;
            cb(null, rnd + extname(file.originalname));
        },
    }),
    fileFilter: (_req, file, cb) => {
        cb(null, !!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/));
    },
    limits: { fileSize: 5 * 1024 * 1024 },
};
