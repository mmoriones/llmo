import { Ollama } from "ollama";

export const ollama = new Ollama({
  host: "http://localhost:11434"
});

let cachedImage = null;

export async function uploadImage(filePath) {

  cachedImage = await ollama.encodeImage(filePath);

}

export function getCachedImage() {
  return cachedImage;
}