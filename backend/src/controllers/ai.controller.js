import { askLLM } from "../services/ai.service.js";

export const chatWithAI = async (req, res) => {

  try {

    const { messages } = req.body;

    const summary = await askLLM(messages);

    res.json({
      message: summary
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "LLM request failed"
    });

  }

};
