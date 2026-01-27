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
