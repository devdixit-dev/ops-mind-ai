import Embedding from '../models/embedding.model.js';

export const storeEmbeddings = async (documentId, embeddedChunks) => {
  if(!embeddedChunks) return;

  const docs = embeddedChunks.map((chunk, index) => ({
    documentId,
    chunkIndex: index,
    content: chunk.content,
    embedding: chunk.embedding,
    metadata: {
      pageNumber: chunk.metadata.pageNumber
    }
  }));

  await Embedding.insertMany(docs, { ordered: false });
}