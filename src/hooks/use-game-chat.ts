"use client";

import { useChat } from "ai/react";
import { useCallback } from "react";

export interface GameMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export function useGameChat(
  gameId: string,
  initialMessages: GameMessage[] = [],
) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: `/api/games/${gameId}/chat`,
      initialMessages: initialMessages.map((msg, idx) => ({
        id: `${msg.role}-${idx}`,
        role: msg.role,
        content: msg.content,
      })),
      onError: (error) => {
        console.error("Chat error:", error);
      },
    });

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;
      handleInputChange({ target: { value: message } } as any);

      // Create a synthetic form event for handleSubmit
      const formEvent = {
        preventDefault: () => {},
        currentTarget: {
          message: { value: message },
        },
      } as any;

      await handleSubmit(formEvent);
    },
    [handleInputChange, handleSubmit],
  );

  return {
    messages: messages.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
      timestamp: new Date(),
    })),
    input,
    handleInputChange,
    sendMessage,
    isLoading,
  };
}
