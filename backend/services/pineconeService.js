import dotenv from "dotenv";
dotenv.config();

import { Pinecone }
from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(
  process.env.PINECONE_INDEX_NAME
);

export default pineconeIndex;