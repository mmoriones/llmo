import { askLLM } from "../services/ai.service.js";

export const chatWithAI = async (req, res) => {

  let clientClosed = false;

  try {

    const { messages } = req.body;

    const { stream, ollama } = await askLLM(messages);

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    req.on("close", () => {
      console.log("Client disconnected — aborting Ollama generation");

      clientClosed = true;

      try {
        ollama.abort();
      } catch (e) {}

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

    if (error.name === "AbortError") {
      //console.log("Generation aborted");
      return;
    }

    if (!res.headersSent) {
      res.status(500).json({
        error: "LLM request failed"
      });
    }
    console.error(error);

  }

};
