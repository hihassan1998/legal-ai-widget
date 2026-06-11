import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  messages: [
    {
      role: String,
      content: String,
    },
  ],
  lead: {
    name: String,
    email: String,
    phone: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema);