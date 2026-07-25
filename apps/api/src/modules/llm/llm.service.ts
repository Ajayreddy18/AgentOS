import Groq from "groq-sdk";
import { InternalServerError } from "../../common/errors/internal-server-error";

if (!process.env.GROQ_API_KEY) {
  throw new InternalServerError("Missing GROQ_API_KEY");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface LLMResponse {
  text: string;
}

export class LLMService {
  async generate(prompt: string): Promise<LLMResponse> {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.2,
    });

    const text = completion.choices[0]?.message?.content ?? "";

    return {
      text,
    };
  }
}
