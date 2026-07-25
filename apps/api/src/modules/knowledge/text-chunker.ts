export interface TextChunk {
  index: number;
  content: string;
}

export function chunkText(
  text: string,
  chunkSize = 500,
  overlap = 100,
): TextChunk[] {
  const chunks: TextChunk[] = [];

  let start = 0;
  let index = 0;

  while (start < text.length) {
    const tentativeEnd = Math.min(start + chunkSize, text.length);

    let end = tentativeEnd;

    const searchStart = Math.max(start, tentativeEnd - 100);

    const sentenceEnd = Math.max(
      text.lastIndexOf(".", tentativeEnd),
      text.lastIndexOf("!", tentativeEnd),
      text.lastIndexOf("?", tentativeEnd),
    );

    if (sentenceEnd >= searchStart) {
      end = sentenceEnd + 1;
    }

    chunks.push({
      index,
      content: text.slice(start, end),
    });

    start += chunkSize - overlap;
    index++;
  }

  return chunks;
}
