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

// Fake message data
const FAKE_MESSAGES = [
  {
    role: "user",
    content: "Can you help me create a simple todo app?",
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    role: "assistant",
    content:
      "I'd be happy to help! A todo app is a great beginner project. We can build one with React and TypeScript. Would you like me to create a basic structure with features like adding, deleting, and marking todos as complete?",
    timestamp: new Date(Date.now() - 4 * 60000),
  },
  {
    role: "user",
    content: "Yes, that sounds good. Can we also add local storage?",
    timestamp: new Date(Date.now() - 3 * 60000),
  },
  {
    role: "assistant",
    content:
      "Absolutely! We can use localStorage to persist the todos. Here's a plan:\n1. Create a Todo type\n2. Build the main Todo component\n3. Add localStorage hooks\n4. Style it with Tailwind CSS\n\nLet's start with the basic structure.",
    timestamp: new Date(Date.now() - 2 * 60000),
  },
  {
    role: "user",
    content: "Great! Let's begin.",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    role: "assistant",
    content:
      "Perfect! Here's the starter code for your Todo App. You can build upon this foundation and add more features as needed.",
    timestamp: new Date(Date.now()),
  },
];

export default function GamePage() {
  const params = useParams();
  const gameId = params.id as string;
  const [game, setGame] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(FAKE_MESSAGES);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const loadGame = async () => {
      try {
        const data = await getGame(gameId);
        setGame(data);
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

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: value,
        timestamp: new Date(),
      },
    ]);

    setInputValue("");

    // Simulate assistant response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a simulated response. In a real application, this would be connected to an AI backend.",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
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
      <div className="border-b border-border/40 px-6 py-4 flex items-center justify-between bg-white dark:bg-slate-950">
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
                {messages.map((message, index) => (
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
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>

      {/* Chat Input */}
      <div className="border-t border-border/40 px-6 py-6 bg-white dark:bg-slate-950">
        <div className="flex flex-col gap-3 max-w-4xl mx-auto">
          <ChatComposer
            value={inputValue}
            onValueChange={setInputValue}
            onSubmit={handleSubmit}
            placeholder="Message..."
          />
          <p className="text-xs text-muted-foreground text-center">
            Press Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
