"use client";

import Link from "next/link";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageHero from "@/components/PageHero";

const games = [
  {
    num: "01",
    title: "Trivia",
    desc: "Test your knowledge across categories. Powered by Open Trivia Database.",
    href: "/games/trivia",
  },
  {
    num: "02",
    title: "Poker",
    desc: "Texas Hold'em against a bot. Bluff your way to victory.",
    href: "/games/poker",
  },
  {
    num: "03",
    title: "Chess",
    desc: "Play chess against a built-in AI opponent. Prove your strategy.",
    href: "/games/chess",
  },
  {
    num: "04",
    title: "Wordle",
    desc: "Guess the 5-letter word in 6 tries. Daily seed or random mode.",
    href: "/games/wordle",
  },
  {
    num: "05",
    title: "Dino Runner",
    desc: "Chrome-style dino runner. Jump over cacti, survive as long as possible.",
    href: "/games/dino",
  },
];

export default function GamesPage() {
  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 px-6 md:px-12">
        <PageHero
          num="05 — GAMES"
          title="Take a Break"
          subtitle="Five games built right in. No ads, no accounts, no nonsense."
        />

        <div className="pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l-2 border-t-2 border-border">
          {games.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group relative flex flex-col justify-between p-8 md:p-10 border-r-2 border-b-2 border-border hover:bg-accent transition-colors duration-300 min-h-[200px] overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-muted group-hover:text-black/50 transition-colors tracking-widest">
                  {g.num}
                </span>
                <span className="font-mono text-sm text-muted group-hover:text-black transition-colors">
                  →
                </span>
              </div>

              <span
                aria-hidden
                className="absolute bottom-0 right-2 font-display font-bold leading-none text-border group-hover:text-black/[0.07] transition-colors select-none pointer-events-none"
                style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
              >
                {g.num}
              </span>

              <div className="relative z-10">
                <h2
                  className="font-display font-black uppercase tracking-tighter text-text group-hover:text-black transition-colors leading-none"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
                >
                  {g.title}
                </h2>
                <p className="font-sans text-sm text-muted group-hover:text-black/60 transition-colors mt-2 leading-relaxed">
                  {g.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
