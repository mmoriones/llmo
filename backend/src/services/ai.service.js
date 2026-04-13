import ollama from "ollama";
import { OLLAMA_MODEL } from "../config/ollama.js";

export async function askLLM(messages, signal) {

  const system = {
    role: "system",
    content: "You are concise but helpful."
  };

  const response = await ollama.chat({
    model: OLLAMA_MODEL,
    messages: [system, ...messages],
    stream: true,
    signal
  });

  return response;
}
