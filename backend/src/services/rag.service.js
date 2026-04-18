import { Ollama } from "ollama";

const chat_model = "qwen3.5:0.8b"

export const ollama = new Ollama({
  host: "http://localhost:11434"
});

export async function askRAG(question, contextChunks) {

  const context = contextChunks.map(c => c.text).join("\n\n");

  const prompt = `
    You are answering questions based ONLY on the provided document.

      Context:
      ${context}

      Question:
      ${question}

      Answer:
      `;

  const stream = await ollama.chat({
    model: chat_model,
    messages: [{ role: "user", content: prompt }],
    stream: true,
    keep_alive: "1h",
    think: false
  });

  return {
    stream,
    ollama
  };
}
