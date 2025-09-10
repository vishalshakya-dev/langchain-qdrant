import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CONFIG } from '../config/index.js';

export async function splitTextToDocs(text, meta = {}) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CONFIG.CHUNK_SIZE,
    chunkOverlap: CONFIG.CHUNK_OVERLAP,
    separators: ['\n\n', '\n', ' ', '']
  });

  return await splitter.createDocuments([text], { metadata: meta });
}
