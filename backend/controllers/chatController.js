/*
import dotenv from "dotenv";
dotenv.config();

import { HuggingFaceTransformersEmbeddings } 
from "@langchain/community/embeddings/hf_transformers";

import { Pinecone } 
from "@pinecone-database/pinecone";

// Embedding Model
const embeddings =
  new HuggingFaceTransformersEmbeddings({
    modelName: "Xenova/all-MiniLM-L6-v2",
  });

// Pinecone Client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// Pinecone Index
const pineconeIndex = pinecone.Index(
  process.env.PINECONE_INDEX_NAME
);

// Main Controller
export const askQuestion = async (req, res) => {

  try {

    const { question } = req.body;

    // Validate input
    if (!question || question.trim() === "") {

      return res.status(400).json({
        answer: "Question is required.",
      });
    }

    // Convert question into embedding vector
    const queryVector =
      await embeddings.embedQuery(question);

    // Search similar vectors in Pinecone
    const searchResults =
      await pineconeIndex.query({
        topK: 3,
        vector: queryVector,
        includeMetadata: true,
      });

    // Debugging
    console.log(searchResults);

    // Filter valid results
    const filteredMatches =
      searchResults.matches.filter(
        (match) =>
          match &&
          match.score > 0.30 &&
          match.metadata &&
          typeof match.metadata.text === "string"
      );

    // No relevant result
    if (filteredMatches.length === 0) {

      return res.json({
        answer:
          "I could not find relevant information.",
      });
    }

    // Get best result
    const answer =
      filteredMatches[0].metadata.text;

    // Send response
    res.json({ answer });

  } catch (error) {

    console.log("ERROR:");
    console.log(error);

    res.status(500).json({
      answer: "Something went wrong.",
    });
  }
};
*/


import dotenv from "dotenv";
dotenv.config();

import { HuggingFaceTransformersEmbeddings }
from "@langchain/community/embeddings/hf_transformers";

import { Pinecone }
from "@pinecone-database/pinecone";

// Embedding Model
const embeddings =
  new HuggingFaceTransformersEmbeddings({
    modelName: "Xenova/all-MiniLM-L6-v2",
  });

// Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(
  process.env.PINECONE_INDEX_NAME
);

export const askQuestion = async (req, res) => {

  try {

    const { question } = req.body;

    if (!question) {

      return res.json({
        answer: "Please ask a question.",
      });
    }

    // Convert question to vector
    const queryVector =
      await embeddings.embedQuery(question);

    // Search Pinecone
    const searchResults =
      await pineconeIndex.query({
        topK: 3,
        vector: queryVector,
        includeMetadata: true,
      });

    // No matches
    if (
      !searchResults.matches ||
      searchResults.matches.length === 0
    ) {

      return res.json({
        answer:
          "I could not find relevant information.",
      });
    }

    // Best result
    const bestMatch =
      searchResults.matches[0];

    // Final answer
    const answer =
      bestMatch.metadata?.text ||
      "No answer found.";

    // Send response
    res.json({ answer });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      answer: "Something went wrong.",
    });
  }
};