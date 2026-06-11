import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  widgetKey: {
    type: String,
    required: true,
    index: true,
  },
  
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