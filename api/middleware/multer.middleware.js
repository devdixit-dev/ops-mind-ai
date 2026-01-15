import multer from "multer";
import path from 'path';
import fs from 'fs';

const uploadDirectory = path.join(process.cwd(), "uploads");

if(!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);

    cb(null, `document-${suffix}${ext}`);
  }
});

const pdfFilter = (req, file, cb) => {
  if(file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed"));
  }

  cb(null, true);
}

export const uploader = multer({
  storage,
  fileFilter: pdfFilter,
  limits: {
    files: 1,
    fileSize: 10 * 1024 * 1024,
  }
});