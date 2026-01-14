import express from 'express';
import 'dotenv/config';
import connectToDatabase from './config/db.config.js';

import { uploader } from './middleware/multer.middleware.js';

const app = express();
const port = process.env.PORT || 3030;

connectToDatabase();

app.get("/", (req, res) => {
  res.send('Home page of Chat PDF AI');
});

app.post("/upload", uploader.single('file'), (req, res) => {
  const file = req.file;

  res.json({
    success: true,
    data: file
  });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});