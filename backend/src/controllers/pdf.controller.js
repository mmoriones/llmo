import { extractPDFText, splitText } from "../services/pdf.service.js";
import { embedLLM } from "../services/embed.service.js";

export const uploadPDF = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    console.log("Uploaded file:", filePath);

    const text = await extractPDFText(filePath);
    const chunks = splitText(text);
    
    const embeddings = await embedLLM(chunks);

    console.log("PDF TEXT LENGTH:", text.length);
    console.log("CHUNKS:", chunks.length);
    console.log("FIRST CHUNK SIZE:", chunks[0].length);

    res.json({
      message: "PDF processed",
      chunks: chunks.length,
      embeddings: embeddings.length
    });

  } catch (error) {

    console.error("PDF ERROR:", error);   // ← IMPORTANT

    res.status(500).json({
      error: "PDF processing failed"
    });
  }
};
