import { CONFIG } from '../config/index.js';

function makeId(fallbackSeed) {
  if (globalThis?.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}-${fallbackSeed ?? 0}`;
}

function createHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (CONFIG.QDRANT_API_KEY) {
    headers['api-key'] = CONFIG.QDRANT_API_KEY;
  }
  return headers;
}


async function createCollection(collectionName) {
  const url = `${CONFIG.QDRANT_URL}/collections/${encodeURIComponent(collectionName)}`;
  const headers = createHeaders();
  const vectorSize = CONFIG.EMBEDDING_PROVIDER === 'openai' ? 1536 : 384;
  
  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      vectors: {
        size: vectorSize,
        distance: 'Cosine'
      }
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create collection: ${errorText}`);
  }
}

async function ensureCollectionExists(collectionName) {
  const url = `${CONFIG.QDRANT_URL}/collections/${encodeURIComponent(collectionName)}`;
  const headers = createHeaders();
  
  const res = await fetch(url, { method: 'GET', headers });
  
  if (res.status === 404) {
    await createCollection(collectionName);
  } else if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to check collection: ${errorText}`);
  }
}

async function upsertPoints(collectionName, points) {
  const url = `${CONFIG.QDRANT_URL}/collections/${encodeURIComponent(collectionName)}/points?wait=true`;
  const headers = createHeaders();
  
  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ points }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Upsert failed: ${errorText}`);
  }
  
  return res.json();
}

export async function upsertDocumentsToQdrant(embeddingsClient, documents, options = {}) {
  if (!Array.isArray(documents) || documents.length === 0) {
    console.log('No documents to upsert.');
    return;
  }

  const collectionName = options.collectionName || CONFIG.COLLECTION_NAME;
  const batchSize = options.batchSize || CONFIG.UPSERT_BATCH_SIZE || 64;

  // Ensure collection exists
  await ensureCollectionExists(collectionName);

  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = documents.slice(i, i + batchSize);
    const texts = batch.map(d => (d.pageContent ?? '').toString());

    // Generate embeddings
    const embeddings = await embeddingsClient.embedDocuments(texts);
    
    if (!Array.isArray(embeddings) || embeddings.length !== texts.length) {
      throw new Error(`Embeddings count mismatch: expected ${texts.length}, got ${embeddings?.length}`);
    }

    // Create points for Qdrant
    const points = embeddings.map((vector, idx) => {
      const doc = batch[idx];
      const id = doc?.metadata?.id || makeId(i + idx);
      return {
        id,
        vector,
        payload: {
          text: doc?.pageContent ?? null,
          metadata: doc?.metadata ?? {},
        },
      };
    });

    await upsertPoints(collectionName, points);
    console.log(`Upserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(documents.length / batchSize)} (${points.length} points)`);
  }
}