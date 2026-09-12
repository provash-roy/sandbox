import { createGame } from "@/lib/games/actions";
import {
  ArrowUp,
  Crosshair,
  Infinity,
  MousePointer2,
  Paperclip,
  Puzzle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "./ui/toast";
import { useRouter } from "next/navigation";

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

export function NewGameComposer() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    await createGame(prompt);
   alert("Game created successfully!");
    setPrompt("");
    router.refresh();
  };

  const handleSuggestion = (text: string) => {
    setPrompt(
      `A ${text.toLowerCase()} game with fun gameplay and simple controls`,
    );
  };

  return (
    <div className="w-full">
      {/* Composer */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#151619]">
        {/* Textarea */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          placeholder="A 2D platformer where you play a fox collecting stars while avoiding owls..."
          className="min-h-56 w-full resize-none bg-transparent p-6 pb-20 text-base text-white outline-none placeholder:text-zinc-500"
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
            onClick={handleSubmit}
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
  );
}

// "use client";

// import {
//   ArrowUp,
//   Crosshair,
//   Infinity,
//   MousePointer2,
//   Paperclip,
//   Puzzle,
// } from "lucide-react";
// import { useState } from "react";

// const suggestions = [
//   {
//     label: "Endless runner",
//     icon: Infinity,
//   },
//   {
//     label: "Puzzle match-3",
//     icon: Puzzle,
//   },
//   {
//     label: "Top-down shooter",
//     icon: Crosshair,
//   },
//   {
//     label: "Idle clicker",
//     icon: MousePointer2,
//   },
// ];

// export function NewGameComposer() {
//   const [prompt, setPrompt] = useState("");

//   const handleSuggestion = (text: string) => {
//     setPrompt(
//       `A ${text.toLowerCase()} game with fun gameplay and simple controls`,
//     );
//   };

//   const handleChange = (value: string) => {
//     setPrompt(value);
//   };

//   return (
//     <div className="w-full space-y-4">
//       {/* Composer */}
//       <div className="group relative overflow-hidden rounded-2xl border bg-background shadow-sm transition-colors focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20">
//         {/* Textarea */}
//         <textarea
//           value={prompt}
//           onChange={(e) => handleChange(e.target.value)}
//           rows={3}
//           placeholder="Describe the game you want to build..."
//           className="min-h-32 w-full resize-none bg-transparent px-5 pt-5 pb-16 text-base leading-6 outline-none placeholder:text-muted-foreground"
//         />

//         {/* Bottom toolbar */}
//         <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
//           {/* Attachment */}
//           <button
//             type="button"
//             aria-label="Add attachment"
//             className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//           >
//             <Paperclip className="size-4" />
//           </button>

//           {/* Submit */}
//           <button
//             type="button"
//             disabled={!prompt.trim()}
//             aria-label="Create game"
//             className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-all hover:scale-105 hover:opacity-90 disabled:pointer-events-none disabled:opacity-30"
//           >
//             <ArrowUp className="size-4" />
//           </button>
//         </div>
//       </div>

//       {/* Suggestions */}
//       <div className="flex flex-wrap justify-center gap-2">
//         {suggestions.map((item) => {
//           const Icon = item.icon;

//           return (
//             <button
//               key={item.label}
//               type="button"
//               onClick={() => handleSuggestion(item.label)}
//               className="inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-2 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
//             >
//               <Icon className="size-4" />
//               <span>{item.label}</span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
