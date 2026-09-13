"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatComposer } from "@/components/chat-composer";
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
  MessageScrollerButton,
} from "@/components/ui/message-scroller";
import { getGame } from "@/lib/games/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GameData {
  id: string;
  title: string;
  messages: unknown;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function GamePage() {
  const params = useParams();
  const gameId = params.id as string;
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const data = await getGame(gameId);
        if (data) {
          setGame({
            id: data.id as string,
            title: data.title as string,
            messages: data.messages,
          });

          // Load existing messages from database
          if (Array.isArray(data.messages)) {
            const validMessages = data.messages.filter((msg) => {
              return !!(
                msg &&
                typeof msg === "object" &&
                "role" in msg &&
                "content" in msg
              );
            });

            setMessages(
              validMessages.map((msg) => ({
                role: (msg as Record<string, unknown>).role as
                  | "user"
                  | "assistant",
                content: String((msg as Record<string, unknown>).content),
                timestamp: new Date(),
              })),
            );
          }
        }
      } catch (error) {
        console.error("Failed to load game:", error);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      loadGame();
    }
  }, [gameId]);

  const handleSubmit = async (value: string) => {
    if (!value.trim() || isStreaming) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      role: "user",
      content: value,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    // Add placeholder for assistant message
    const assistantMessageIndex = messages.length + 1;

    try {
      const response = await fetch(`/api/games/${gameId}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            userMessage,
          ].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      let assistantContent = "";
      const decoder = new TextDecoder();

      // Create placeholder message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      // Stream chunks and update message in real-time
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        // Update the last message (assistant's message) with streamed content
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.role === "assistant") {
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: assistantContent,
            };
          }
          return updated;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading game...</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Game not found</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/40 px-6 py-4 flex items-center justify-between bg-white dark:bg-slate-950 shrink-0">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-foreground">
            {String(game.title) || "Untitled Game"}
          </h1>
          <p className="text-xs text-muted-foreground">ID: {params.id}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="px-6 py-8 gap-4">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Start a conversation about your game!</p>
                  </div>
                ) : (
                  messages.map((message: ChatMessage, index: number) => (
                    <MessageScrollerItem
                      key={index}
                      scrollAnchor={index === messages.length - 1}
                    >
                      <div
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        } mb-2`}
                      >
                        <div
                          className={`flex gap-3 max-w-2xl ${
                            message.role === "user"
                              ? "flex-row-reverse"
                              : "flex-row"
                          }`}
                        >
                          <Avatar className="w-8 h-8 shrink-0">
                            {message.role === "user" ? (
                              <>
                                <AvatarImage src="/api/avatar?role=user" />
                                <AvatarFallback className="text-xs font-semibold">
                                  You
                                </AvatarFallback>
                              </>
                            ) : (
                              <>
                                <AvatarImage src="/api/avatar?role=assistant" />
                                <AvatarFallback className="bg-linear-to-br from-cyan-500 to-blue-500 text-white text-xs font-semibold">
                                  AI
                                </AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          <div
                            className={`flex flex-col gap-2 ${
                              message.role === "user"
                                ? "items-end"
                                : "items-start"
                            }`}
                          >
                            <div
                              className={`rounded-lg px-4 py-3 text-sm leading-relaxed max-w-xl wrap-break-word ${
                                message.role === "user"
                                  ? "bg-blue-600 text-white rounded-br-none"
                                  : "bg-gray-100 dark:bg-gray-800 text-foreground rounded-bl-none"
                              }`}
                            >
                              {message.content}
                            </div>
                            <p className="text-xs text-muted-foreground px-2">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </MessageScrollerItem>
                  ))
                )}
                {isStreaming && (
                  <div className="flex justify-start mb-2">
                    <div className="flex gap-3 max-w-2xl">
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarFallback className="bg-linear-to-br from-cyan-500 to-blue-500 text-white text-xs font-semibold">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2 items-start">
                        <div className="rounded-lg px-4 py-3 text-sm bg-gray-100 dark:bg-gray-800 text-foreground rounded-bl-none">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>

      {/* Chat Input */}
      <div className="border-t border-border/40 bg-white dark:bg-slate-950 shrink-0 py-4">
        <div className="flex flex-col gap-2 max-w-4xl mx-auto px-6">
          <div className="w-full **:data-[slot=input-group]:h-auto **:data-[slot=input-group]:min-h-12">
            <ChatComposer
              value={input}
              onValueChange={setInput}
              onSubmit={handleSubmit}
              placeholder="Message..."
              disabled={isStreaming}
              streaming={isStreaming}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Press Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
