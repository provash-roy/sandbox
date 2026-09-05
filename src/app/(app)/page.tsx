"use client";

import { useState } from "react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

import {
  Paperclip,
  ArrowUp,
  Infinity,
  Puzzle,
  Crosshair,
  MousePointer2,
  Gamepad2,
} from "lucide-react";

const suggestions = [
  {
    label: "Endless runner",
    icon: Infinity,
  },
  {
    label: "Puzzle match-3",
    icon: Puzzle,
  },
  {
    label: "Top-down shooter",
    icon: Crosshair,
  },
  {
    label: "Idle clicker game",
    icon: MousePointer2,
  },
];

export default function AppPage() {
  const [prompt, setPrompt] = useState("");

  const handleSuggestion = (text: string) => {
    setPrompt(
      `A ${text.toLowerCase()} game with fun gameplay and simple controls`,
    );
  };

  return (
    <main className="min-h-screen flex items-center justify center bg-[#08090b] px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What game do you want to build?
          </h1>

          <p className="mt-3 text-base text-zinc-400 sm:text-lg">
            Describe it in plain language and Sandbox will generate a playable
            prototype.
          </p>
        </div>

        {/* Prompt Box */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#151619]">
        
          {/* Textarea */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A 2D platformer where you play a fox collecting stars while avoiding owls..."
            className="min-h-75 w-full resize-none bg-transparent p-6 pb-20 text-base text-white outline-none placeholder:text-zinc-500"
          />

          {/* Bottom Actions */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            {/* Attachment */}
            <button
              type="button"
              className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              <Paperclip className="size-5" />
            </button>

            {/* Submit */}
            <button
              type="button"
              disabled={!prompt.trim()}
              className="flex size-11 items-center justify-center rounded-full bg-violet-600 text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUp className="size-5" />
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {suggestions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleSuggestion(item.label)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-[#151619] px-4 py-2.5 text-sm text-zinc-400 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
