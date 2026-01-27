import { embeddings } from "../config/embedding.config.js";

const BATCH_SIZE = 16;

export const chunksEmbedding = async (chunks) => {
  if (!Array.isArray(chunks) || chunks.length === 0) return [];

  const embeddedChunks = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map(c => c.content);

    const vectors = await embeddings.embedDocuments(texts);

    for (let j = 0; j < batch.length; j++) {
      embeddedChunks.push({
        content: batch[j].content,
        embedding: vectors[j],
        metadata: batch[j].metadata,
      });
    }
  }

  return embeddedChunks;
};
