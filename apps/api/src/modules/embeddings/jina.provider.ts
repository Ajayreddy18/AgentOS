import axios from "axios";

import { env } from "../../config/env";

import type {
  GenerateEmbeddingInput,
  GenerateEmbeddingResponse,
} from "./embedding.types";

import type { EmbeddingProvider } from "./embedding.interface";
import { ProviderError } from "../../common/errors/provider-error";
import { logger } from "../../common/logger/logger";
export class JinaEmbeddingProvider implements EmbeddingProvider {
  async generateEmbedding(
    input: GenerateEmbeddingInput,
  ): Promise<GenerateEmbeddingResponse> {
    try {
      const response = await axios.post(
        "https://api.jina.ai/v1/embeddings",
        {
          model: "jina-embeddings-v3",
          input: [input.text],
        },
        {
          headers: {
            Authorization: `Bearer ${env.JINA_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const embedding = response.data.data[0]?.embedding;

      if (!embedding) {
        throw new ProviderError("Jina returned an empty embedding.");
      }

      return {
        embedding,
      };
    } catch (error: unknown) {
      logger.error(
        {
          err: error,
        },
        "Jina embedding generation failed",
      );

      if (axios.isAxiosError(error)) {
        throw new ProviderError(
          error.response?.data?.message ??
            error.message ??
            "Failed to generate embedding",
        );
      }

      if (error instanceof Error) {
        throw new ProviderError(error.message);
      }

      throw new ProviderError("Failed to generate embedding");
    }
  }
}
