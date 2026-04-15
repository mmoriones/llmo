import { Ollama } from "ollama";

const embed_model = "nomic-embed-text";

export const ollama = new Ollama();

export async function embedLLM(input) {

  const embeddings = await ollama.embed({
    model: embed_model,
    input: input
  });

  return embeddings
}
