import { ollama } from "../services/chat.service.js";

export const abortGeneration = async (req, res) => {

  try {
    if (ollama){
      ollama.abort();
    }

    console.log("Ollama generation aborted");

    res.json({ status: "aborted" });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Abort failed"
    });

  }

};
