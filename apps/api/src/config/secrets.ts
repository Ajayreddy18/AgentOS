import { env } from "./env";

export const secrets = {
  jwtSecret: env.JWT_SECRET,

  groqApiKey: env.GROQ_API_KEY,

  databaseUrl: env.DATABASE_URL,
} as const;
