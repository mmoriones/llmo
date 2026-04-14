import { Ollama } from "ollama";
import { OLLAMA_MODEL } from "../config/ollama.js";

export const ollama = new Ollama();

export async function askLLM(messages) {

  const system = {
    role: "system",
    content: "You are concise but helpful."
  };

  const stream = await ollama.chat({
    model: OLLAMA_MODEL,
    messages: [system, ...messages],
    stream: true,
  });

  return {
    stream,
    ollama
  };
}
