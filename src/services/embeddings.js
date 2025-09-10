import { CONFIG } from '../config/index.js';
import { OpenAIEmbeddings } from '@langchain/openai';

class FastEmbedClient {
  constructor(baseUrl) {
    this.baseUrl = (baseUrl || CONFIG.EMBEDDING_SERVICE_URL).replace(/\/+$/, '');
  }

  async embedDocuments(texts) {
    if (!Array.isArray(texts)) throw new Error('texts must be an array');
    const url = `${this.baseUrl}/embed/batch`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts }),
    });
    
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`FastEmbed /embed/batch failed ${res.status}: ${txt}`);
    }
    const body = await res.json();
    
    if (!body.embeddings || !Array.isArray(body.embeddings)) {
      throw new Error('Invalid response from embedding service');
    }
    return body.embeddings;
  }
}

function createOpenAIClient() {
  if (!CONFIG.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY required for provider=openai');
  }

  const client = new OpenAIEmbeddings({
    model: CONFIG.EMBEDDING_MODEL,
    openAIApiKey: CONFIG.OPENAI_API_KEY,
  });

  return {
    async embedDocuments(texts) {
      if (!Array.isArray(texts)) throw new Error('texts must be an array');
      return client.embedDocuments(texts);
    },
  };
}

export function createEmbeddingsClient() {
  const provider = (CONFIG.EMBEDDING_PROVIDER || 'fastembed').toLowerCase();
  
  if (provider === 'openai') return createOpenAIClient();

  return new FastEmbedClient(CONFIG.EMBEDDING_SERVICE_URL);
}
