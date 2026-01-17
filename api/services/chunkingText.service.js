// // 2 - Text to chunks array

// export const textToChunks = (text, chunkSize = 400, overlap = 100) => {
//   if(!text || chunkSize <= overlap) return null;

//   const chunks = [];
//   let start = 0;

//   while(start < text.length) {
//     const end = start + chunkSize;
//     const chunk = text.slice(start, end);

//     chunks.push(chunk.trim());

//     start = end - overlap;
//   }

//   return chunks;
// }

// utils/textToChunks.js
export const textToChunks = (
  pages,
  chunkSize = 400,
  overlapSentences = 2
) => {
  if (!Array.isArray(pages)) return [];

  const chunks = [];

  for (const page of pages) {
    const sentences = page.text
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean);

    let buffer = [];
    let bufferLength = 0;

    for (const sentence of sentences) {
      buffer.push(sentence);
      bufferLength += sentence.length;

      if (bufferLength >= chunkSize) {
        chunks.push({
          content: buffer.join(" "),
          metadata: {
            pageNumber: page.pageNumber,
          },
        });

        buffer = buffer.slice(-overlapSentences);
        bufferLength = buffer.reduce((sum, s) => sum + s.length, 0);
      }
    }

    if (buffer.length > 0) {
      chunks.push({
        content: buffer.join(" "),
        metadata: {
          pageNumber: page.pageNumber,
        },
      });
    }
  }

  return chunks; // [{ content, metadata }]
};
