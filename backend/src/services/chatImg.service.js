import { ollama, getCachedImage } from "./imgUpload.service.js";

const chat_model = "qwen3.5:0.8b";

export async function askLLMImg(messages) {

  const system = {
    role: "system",
    content: "You are concise but helpful."
  };

  const image = getCachedImage();

  if (!image) {
    throw new Error("No image uploaded");
  }

  const stream = await ollama.chat({
    model: chat_model,
    messages: [
        system,
        {
            ...messages[0],
            images: [image]
        },
        ...messages.slice(1)
        ],

    stream: true,
    keep_alive: "1h",
    think: false
  });

  return {
    stream,
    ollama
  };
}
