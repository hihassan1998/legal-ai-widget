import { connectDB } from "../../lib/mongo";
import Conversation from "../../models/Conversations";

export async function POST(req: Request) {
  await connectDB();

  const { conversationId, lead } = await req.json();

  const convo = await Conversation.findById(conversationId);

  if (convo) {
    convo.lead = lead;
    await convo.save();
  }

  return Response.json({ success: true });
}