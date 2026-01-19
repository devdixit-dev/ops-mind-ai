import express from 'express';
import 'dotenv/config';
import connectToDatabase from './config/db.config.js';

import { uploader } from './middleware/multer.middleware.js';

import { pdfToText } from './services/pdfToText.service.js';
import { textToChunks } from './services/chunkingText.service.js';
import { chunksEmbedding } from './services/textEmbeddings.service.js';
import { storeEmbeddings } from './services/storeEmbeddings.service.js';

import Document from './models/document.model.js';

import AuthRouter from './routes/auth.route.js';
import AdminRouter from './routes/admin.route.js';
import UserRouter from './routes/user.route.js';

const app = express();
const port = process.env.PORT || 3030;

connectToDatabase();

app.use((req, _, next) => {
  console.log(`${req.url} - ${req.method} - ${req.ip}`);
  next();
});

app.use(express.json());

app.use('/api/auth', AuthRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/user', UserRouter);

app.get("/", (req, res) => {
  res.send('Home page of OpsMind AI');
});

app.post("/upload", uploader.single('file'), async (req, res) => {
  const file = req.file;
  if(!file) return res.json({ success: false, message: 'Upload PDF file to continue' });

  const doc = await Document.create({ filename: file.filename });

  if(file.mimetype !== "application/pdf") {
    return res.status(400).json({
      success: false,
      message: "Only PDF files are allowed"
    });
  }

  const pages = await pdfToText(file.path);
  const chunks = textToChunks(pages, 400, 2);
  const embeddedChunks = await chunksEmbedding(chunks);

  console.log(`Total chunks: ${embeddedChunks.length}`);

  await storeEmbeddings(doc._id, embeddedChunks);
  doc.status = "ready";
  await doc.save();

  console.log(doc._id);

  res.json({
    success: true,
    data: embeddedChunks
  });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});