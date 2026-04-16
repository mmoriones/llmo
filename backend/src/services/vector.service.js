import fs from "fs/promises";
import { cosineSimilarity } from "../../utils/similarity.js";

const DB_PATH = "./data/vectorStore.json";

let vectorData = [];

// Save embeddings (overwrite for single PDF)
export async function saveEmbeddings(chunks, embeddings) {

  const data = chunks.map((text, i) => ({
    text,
    embedding: embeddings[i]
  }));

  // overwrite file
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));

  // update in-memory vector store
  vectorData = data;
}


// Load on server start 
export async function loadVectorStore() {

  try {
    const file = await fs.readFile(DB_PATH, "utf-8");
    vectorData = JSON.parse(file);
  } catch {
    vectorData = [];
  }
}

// Search
export function searchSimilar(questionEmbedding, topK = 3) {

  if (vectorData.length === 0) {
    throw new Error("No document loaded.");
  }

  const scored = vectorData.map(item => ({
    text: item.text,
    score: cosineSimilarity(questionEmbedding, item.embedding)
  }));

  scored.sort((a,b) => b.score - a.score);

  return scored.slice(0, topK);
}
