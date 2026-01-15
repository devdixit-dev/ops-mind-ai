import mongoose from "mongoose";

const { Schema } = mongoose;

const EmbeddingSchema = new Schema({
  chunkIndex: {
    type: Number,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  embedding: {
    type: [Number],
    required: true,
  },

  metadata: {
    pageNumber: {
      type: Number,
      required: true,
    },
  },

  embeddingModel: {
    type: String,
    default: "text-embedding-004",
    immutable: true,
  },

  embeddingDimension: {
    type: Number,
    default: 768, // set this once and never lie about it
    immutable: true,
  },
}, { timestamps: true });

// Prevent duplicate chunks for same document
EmbeddingSchema.index(
  { documentId: 1, chunkIndex: 1 },
  { unique: true }
);

const Embedding = mongoose.model("Embedding", EmbeddingSchema);

export default Embedding;