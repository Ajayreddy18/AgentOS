import type {
  GenerateTextInput,
  GenerateTextResponse,
  StreamTextChunk,
} from "./provider.types";

export interface LLMProvider {
  generateText(input: GenerateTextInput): Promise<GenerateTextResponse>;

  streamText(input: GenerateTextInput): AsyncIterable<StreamTextChunk>;
}
