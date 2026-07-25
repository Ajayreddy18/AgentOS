import { MemoryScorer } from "./memory.scorer";

export interface ExtractedMemory {
  name: string;
  content: string;
}

export class MemoryExtractor {
  private scorer = new MemoryScorer();

  extract(userMessage: string): ExtractedMemory[] {
    if (!this.scorer.shouldStore(userMessage)) {
      return [];
    }

    return [
      {
        name: "Conversation Memory",
        content: userMessage,
      },
    ];
  }
}
