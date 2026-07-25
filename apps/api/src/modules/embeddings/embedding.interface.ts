import type {
  GenerateEmbeddingInput,
  GenerateEmbeddingResponse,
} from "./embedding.types";

export interface EmbeddingProvider {
  generateEmbedding(
    input: GenerateEmbeddingInput,
  ): Promise<GenerateEmbeddingResponse>;
}
