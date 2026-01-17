import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  filename: String,
  status: {
    type: String,
    enum: ["processing", "ready", "failed"],
    default: "processing"
  }
}, { timestamps: true });

const Document = mongoose.model("Document", DocumentSchema);

export default Document;