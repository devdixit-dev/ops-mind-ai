import express from 'express';
import 'dotenv/config';
import connectToDatabase from './config/db.config.js';

import { uploader } from './middleware/multer.middleware.js';
import { pdfToText } from './services/pdfToText.service.js';
import { textToChunks } from './utils/chunkingText.util.js';
import { chunksEmbedding } from './services/textEmbeddings.service.js';
import Embedding from './models/embedding.model.js';

const app = express();
const port = process.env.PORT || 3030;

connectToDatabase();

app.get("/", (req, res) => {
  res.send('Home page of Chat PDF AI');
});

app.post("/upload", uploader.single('file'), async (req, res) => {
  const file = req.file;
  if(!file) return res.json({ success: false, message: 'Upload PDF file to continue' });

  if(file.mimetype !== "application/pdf") {
    return res.status(400).json({
      success: false,
      message: "Only PDF files are allowed"
    });
  }

  // const textData = await pdfToText(file.path); // pdf --> text
  // const chunkData = textToChunks(textData); // text --> chunks
  // const embeddedChunks = await chunksEmbedding(chunkData); // chunks --> embeddings

  // const data = await Embedding.create({
  //   userID: 123456789,
  //   content: embeddedChunks
  // })

  const pages = await pdfToText(file.path);
  const chunks = textToChunks(pages, 400, 2);
  const embeddedChunks = await chunksEmbedding(chunks);

  console.log(`Total chunks: ${embeddedChunks.length}`);

  // todo: store in mongodb
  // const data = await Embedding.create({})

  res.json({
    success: true,
    data: embeddedChunks
  });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});