import { embedLLM } from "../services/embed.service.js";

export const embedWithAI = async (req, res) => {

    try{
        const { input } = req.body;

        const { embeddings } = await embedLLM(input);

        res.json({ embeddings });
    }

    catch{
        res.status(500).json({
        error: "Embed failed"
        });
    }
};