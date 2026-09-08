"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { NewGameComposer } from "@/components/new-game-composer";

export default function AppPage() {
  return (
    <main className="min-h-screen bg-[#08090b] px-6 py-16 text-white">
      <Empty className="mx-auto max-w-5xl">
        <EmptyHeader className="mb-10 max-w-none">
          <EmptyTitle className="whitespace-nowrap text-4xl sm:text-5xl">
            What game do you want to build?
          </EmptyTitle>

          <EmptyDescription>
            Build your own racers, shooters, puzzles, and whole worlds using
            your own words. If you can describe it, you can play it.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="max-w-2xl">
          <NewGameComposer />
        </EmptyContent>
      </Empty>
    </main>
  );
}
