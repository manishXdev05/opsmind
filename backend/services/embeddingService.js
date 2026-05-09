import { HuggingFaceTransformersEmbeddings }
from "@langchain/community/embeddings/hf_transformers";

const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
});

export default embeddings;