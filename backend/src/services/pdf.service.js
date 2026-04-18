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
export function splitText(text, maxChunkSize = 500) {

  const paragraphs = text
    .replace(/\r/g, "")
    .split(/\n\s*\n/)   // split by empty lines
    .map(p => p.trim())
    .filter(p => p.length > 0);

  const chunks = [];
  let currentChunk = "";

  for (const paragraph of paragraphs) {

    if ((currentChunk + paragraph).length > maxChunkSize) {

      if (currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
      }

      currentChunk = paragraph;

    } else {

      currentChunk += "\n\n" + paragraph;

    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

