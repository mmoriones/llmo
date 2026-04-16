import { embedLLM } from "../services/embed.service.js";
import { searchSimilar } from "../services/vector.service.js";
import { askRAG } from "../services/rag.service.js";

export const chatWithRAG = async (req, res) => {

  let clientClosed = false;

  try {

    const { messages } = req.body;

    const question = messages[messages.length - 1].content;

    // embed question
    const embeddings = await embedLLM([question]);

    // retrieve relevant chunks
    const results = await searchSimilar(embeddings[0], 3);

    const { stream, ollama } = await askRAG(question, results);

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    req.on("close", () => {
      clientClosed = true;

      try {
        ollama.abort();
      } catch {}
    });

    for await (const chunk of stream) {

      if (clientClosed) break;

      const token = chunk.message?.content || "";

      if (!res.writableEnded) {
        res.write(token);
      }

    }

    if (!res.writableEnded) {
      res.end();
    }

  } catch (error) {

    if (error.name === "AbortError") return;

    if (!res.headersSent) {
      res.status(500).json({
        error: "RAG request failed"
      });
    }

    console.error(error);

  }

};
