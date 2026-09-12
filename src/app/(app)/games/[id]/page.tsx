"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Game } from "@/lib/model";
import { ChatComposer } from "@/components/chat-composer";
import { Message } from "@/components/ui/message";
import { Card } from "@/components/ui/card";

export default function GamePage() {
  const params = useParams();
  // const gameId = params.id as string;
  // const [game, setGame] = useState<Game | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadGame = async () => {
  //     try {
  //       // Fetch game data from API or server action
  //       const response = await fetch(`/api/games/${gameId}`);
  //       const data = await response.json();
  //       setGame(data);
  //     } catch (error) {
  //       console.error("Failed to load game:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (gameId) {
  //     loadGame();
  //   }
  // }, [gameId]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <div className="text-muted-foreground">Loading game...</div>
  //     </div>
  //   );
  // }

  // if (!game) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <div className="text-muted-foreground">Game not found</div>
  //     </div>
  //   );
  // }

  // const messages = Array.isArray(game.messages) ? game.messages : [];

  return (
    <div className="flex h-full flex-col">
      <div>{params.id}</div>
      {/* <div className="flex-1 overflow-y-auto p-4">
        <Card className="mb-4 p-4">
          <h1 className="text-2xl font-bold">{game.title}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Created {new Date(game.createdAt).toLocaleDateString()}
          </p>
        </Card>

        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message: any, index: number) => (
              <Message
                key={index}
                role={message.role}
                content={message.content}
              />
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              No messages yet. Start a conversation!
            </div>
          )}
        </div>
      </div>
      

      <div className="border-t p-4">
        <ChatComposer gameId={gameId} />
      </div> */}
    </div>
  );
}
