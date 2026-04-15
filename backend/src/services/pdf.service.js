import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

export async function extractPDFText(path) {

  const buffer = await fs.readFile(path);

  const parser = new PDFParse({
    data: buffer
  });

  const result = await parser.getText();

  await parser.destroy();
  await fs.unlink(path);

  return result.text;
}

// Chunker
export function splitText(text, chunkSize = 800, overlap = 100) {

  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  return chunks;
}
