import { MEMORY } from "./memory.constants";

export class MemoryScorer {
  score(content: string): number {
    let score = 0;

    const text = content.toLowerCase();

    if (content.length >= MEMORY.MIN_CONTENT_LENGTH) {
      score += 0.3;
    }

    if (
      text.includes("my") ||
      text.includes("i am") ||
      text.includes("i use") ||
      text.includes("i work") ||
      text.includes("always") ||
      text.includes("remember") ||
      text.includes("save") ||
      text.includes("store") ||
      text.includes("keep") ||
      text.includes("note")
    ) {
      score += 0.5;
    }

    if (content.length > 100) {
      score += 0.2;
    }

    return Math.min(score, 1);
  }

  shouldStore(content: string): boolean {
    return this.score(content) >= MEMORY.SCORE_THRESHOLD;
  }
}
