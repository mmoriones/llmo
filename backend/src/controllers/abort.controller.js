import { ollama } from "../services/ai.service.js";

export const abortGeneration = async (req, res) => {

  try {

    ollama.abort();

    console.log("Ollama generation aborted");

    res.json({ status: "aborted" });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Abort failed"
    });

  }

};
