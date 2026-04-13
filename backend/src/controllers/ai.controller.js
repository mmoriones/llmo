import { askLLM } from "../services/ai.service.js";

export const chatWithAI = async (req, res) => {

  const controller = new AbortController();

  try {

    const { messages } = req.body;

    const stream = await askLLM(messages, controller.signal);

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    req.on("close", () => {
      console.log("Client disconnected — aborting Ollama request");
      controller.abort(); // stops ollama generation
    });

    for await (const chunk of stream) {

      const token = chunk.message?.content || "";
      res.write(token);

    }

    res.end();

  } catch (error) {

    if (error.name === "AbortError") {
      console.log("Generation aborted");
      return;
    }

    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "LLM request failed"
      });
    }

  }

};
