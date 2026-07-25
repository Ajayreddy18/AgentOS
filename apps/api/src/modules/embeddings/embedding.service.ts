import { JinaEmbeddingProvider } from "./jina.provider";

export class EmbeddingService {
  private provider = new JinaEmbeddingProvider();

  async generate(text: string): Promise<number[]> {
    const result = await this.provider.generateEmbedding({
      text,
    });

    return result.embedding;
  }
}
