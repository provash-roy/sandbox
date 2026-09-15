import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
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

  const { messages }: { messages: UIMessage[] } = await request.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Invalid messages", { status: 400 });
  }


  const game = await prisma.game.findUnique({
    where: { id },
  });

  if (!game || game.orgId !== orgId) {
    return new Response("Game not found", { status: 404 });
  }


  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== "user") {
    return new Response("Last message must be from user", { status: 400 });
  }

  const result = streamText({
    model: "xai/grok-4.6",
    system:
      "You are a helpful AI assistant for game development. Provide clear, concise, and practical responses to help users build games. Use markdown for code examples and formatting.",
    messages: await convertToModelMessages(messages),
    onFinish: async ({ text }) => {
      await prisma.game.update({
        where: { id },
        data: {
          messages: [
            ...messages.map((message) => ({
              role: message.role,
              content: (message as UIMessage & { content?: string }).content ??
                message.parts
                  .filter((part) => part.type === "text")
                  .map((part) => part.text)
                  .join(""),
            })),
            {
              role: "assistant",
              content: text,
            },
          ],
        },
      });
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
