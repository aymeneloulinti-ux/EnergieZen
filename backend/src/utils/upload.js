import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(currentDir, "../../uploads/services");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const safeName = file.originalname
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9._-]/g, "-");

        cb(null, `${Date.now()}-${safeName}`);
    }
});

export const uploadServiceImage = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
