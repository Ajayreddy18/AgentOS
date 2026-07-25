export function buildKnowledgePrompt(
  query: string,
  documents: {
    name: string;
    content: string;
    similarity: number;
  }[],
) {
  const context = documents
    .map(
      (doc, index) => `
Document ${index + 1}

Title: ${doc.name}

Content:
${doc.content}
`,
    )
    .join("\n-------------------------\n");

  return `
You are an AI assistant.

Answer ONLY using the provided context.

If the answer cannot be found in the context, reply with:
"I don't know."

Context:

${context}

Question:
${query}

Answer:
`;
}
