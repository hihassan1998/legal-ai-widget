import { connectDB } from "../../lib/mongo";
import Conversation from "../../models/Conversations";

export async function POST(req: Request) {
  await connectDB();

  const { conversationId, lead } = await req.json();

  if (!conversationId || !lead) {
    return Response.json(
      { error: "Missing conversationId or lead" },
      { status: 400 }
    );
  }

  const convo = await Conversation.findById(conversationId);

  if (!convo) {
    return Response.json(
      { error: "Conversation not found" },
      { status: 404 }
    );
  }

  //  Prevent duplicate lead overwrite (important)
  if (convo.lead?.email || convo.lead?.phone) {
    return Response.json({
      success: true,
      message: "Lead already exists",
    });
  }

  convo.lead = {
    name: lead.name?.trim(),
    email: lead.email?.trim(),
    phone: lead.phone?.trim(),
  };

  await convo.save();

  return Response.json({
    success: true,
  });
}