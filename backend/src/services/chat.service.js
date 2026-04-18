import { Ollama } from "ollama";

const chat_model = "qwen3.5:0.8b"

export const ollama = new Ollama({
  host: "http://localhost:11434"
});

export async function askLLM(messages) {

  const system = {
    role: "system",
    content: "You are concise but helpful."
  };

  const stream = await ollama.chat({
    model: chat_model,
    messages: [system, ...messages],
    stream: true,
    keep_alive: "1h",
    think: false
  });

  return {
    stream,
    ollama
  };
}
