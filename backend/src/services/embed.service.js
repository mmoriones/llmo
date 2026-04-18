import { Ollama } from "ollama";

const embedClient = new Ollama({
  host: "http://localhost:11435"
});

export async function embedLLM(chunks, batchSize = 4) {

  const embeddings = [];
  const totalBatches = Math.ceil(chunks.length / batchSize);

  const start = Date.now();

  for (let i = 0; i < chunks.length; i += batchSize) {

    const batch = chunks.slice(i, i + batchSize);

    const response = await embedClient.embed({
      model: "nomic-embed-text",
      input: batch
    });

    embeddings.push(...response.embeddings);

    const currentBatch = Math.floor(i / batchSize) + 1;

    // progress %
    const percent = ((currentBatch / totalBatches) * 100).toFixed(1);

    // progress bar
    const barLength = 20;
    const filled = Math.round((currentBatch / totalBatches) * barLength);
    const bar = "█".repeat(filled) + "-".repeat(barLength - filled);

    console.log(
      `[${bar}] ${percent}% | Batch ${currentBatch}/${totalBatches}`
    );
  }

  const end = Date.now();
  console.log("TIME:", (end - start) / 1000, "seconds");

  return embeddings;
}
