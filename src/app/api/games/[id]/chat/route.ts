import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { orgId } = await auth();

  if (!orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await request.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Invalid messages", { status: 400 });
  }

  // Get the game to verify ownership
  const game = await prisma.game.findUnique({
    where: { id },
  });

  if (!game || game.orgId !== orgId) {
    return new Response("Game not found", { status: 404 });
  }

  // Get the last user message
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== "user") {
    return new Response("Last message must be from user", { status: 400 });
  }

  // Stream the AI response
  const result = await streamText({
    model: groq("llama3-8b-8192"),
    system:
      "You are a helpful AI assistant for game development. Provide clear, concise, and practical responses to help users build games. Use markdown for code examples and formatting.",
    messages: messages.map((msg: { role: string; content: string }) => ({
      role: msg.role,
      content: msg.content,
    })),
  });

  // Collect the full response for database persistence
  let fullResponse = "";

  // Create a custom stream that also saves to the database
  const customStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.textStream) {
          fullResponse += chunk;
          // Send each chunk as data in text/event-stream format
          controller.enqueue(chunk);
        }

        // After streaming is complete, save to database
        const allMessages = [
          ...messages.map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content,
          })),
          {
            role: "assistant",
            content: fullResponse,
          },
        ];

        await prisma.game.update({
          where: { id },
          data: {
            messages: allMessages,
          },
        });

        controller.close();
      } catch (error) {
        console.error("Stream error:", error);
        controller.error(error);
      }
    },
  });

  return new Response(customStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
