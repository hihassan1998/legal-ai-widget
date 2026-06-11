import { connectDB } from "../../lib/mongo";
import { askAI } from "../../lib/openai";
import Conversation from "../../models/Conversations";

export async function POST(req: Request) {
  await connectDB();

  const { message, conversationId } = await req.json();

  let convo;

  if (conversationId) {
    convo = await Conversation.findById(conversationId);
  }

  if (!convo) {
    convo = await Conversation.create({
      messages: [],
    });
  }

  convo.messages.push({
    role: "user",
    content: message,
  });

  const aiResponse = await askAI(convo.messages);

  convo.messages.push({
    role: "assistant",
    content: aiResponse,
  });

  await convo.save();

  return Response.json({
    response: aiResponse,
    conversationId: convo._id,
  });
}