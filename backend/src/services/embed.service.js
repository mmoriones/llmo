import { Ollama } from "ollama";

const embed_model = "nomic-embed-text";

export const ollama = new Ollama();

export async function embedLLM(inputs) {

  const response = await ollama.embed({
    model: embed_model,
    input: inputs
  });

  return response;
}
