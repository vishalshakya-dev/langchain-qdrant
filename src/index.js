import { CONFIG, SAMPLE_CONTENT } from './config/index.js';
import { splitTextToDocs } from './services/splitter.js';
import { createEmbeddingsClient } from './services/embeddings.js';
import { upsertDocumentsToQdrant } from './services/quadrantService.js';

(async function main() {
  try {
    const collectionName = CONFIG.COLLECTION_NAME;
    
    if (!CONFIG.QDRANT_URL) {
      throw new Error('QDRANT_URL not set. Please set it in your .env file or environment variables.');
    }

    if (!CONFIG.QDRANT_API_KEY) {
      throw new Error('QDRANT_API_KEY not set. Please set it in your .env file or environment variables.');
    }

    if (CONFIG.EMBEDDING_PROVIDER === 'openai' && !CONFIG.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY must be set when EMBEDDING_PROVIDER=openai');
    }

    console.log(`Processing content with ${CONFIG.EMBEDDING_PROVIDER} embeddings...`);

    const content = SAMPLE_CONTENT;
    const docs = await splitTextToDocs(content);    

    const embeddingsClient = createEmbeddingsClient();

    await upsertDocumentsToQdrant(embeddingsClient, docs, {
      collectionName,
      batchSize: CONFIG.UPSERT_BATCH_SIZE,
    });
  } catch (err) {
    console.error('Fatal error:', err?.message ?? err);
    if (err?.stack) console.error(err.stack);
  }
})();
