import ollama from "ollama";
import { OLLAMA_MODEL } from "../config/ollama.js";

export async function askLLM(messages) {

  const system = {
    role: "system",
    content: "You are a helpful assistant but you can limit your words to preserve tokens without losing important details."
  };

  const response = await ollama.chat({
    model: OLLAMA_MODEL,
    messages: [system, ...messages]
  });

  return response.message.content;
}
