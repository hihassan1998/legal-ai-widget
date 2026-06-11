import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askAI(messages: any[]) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a Swedish legal intake assistant. Provide general legal guidance only. Never claim to be a lawyer.",
      },
      ...messages,
    ],
  });

  return res.choices[0].message.content;
}