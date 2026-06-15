"use client";

import NoiseOverlay from "@/components/NoiseOverlay";
import PageHero from "@/components/PageHero";
import { achievements } from "@/data/achievements";

export default function AchievementsPage() {
  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 px-6 md:px-10">
        <PageHero
          num="07 — ACHIEVEMENTS"
          title="Wins & Recognition"
          subtitle="Competitions, hackathons, and case studies where the work held up."
        />

        <div className="pb-24 pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l-2 border-t-2 border-border">
          {achievements.map((a, i) => (
            <div
              key={a.id}
              className="group relative flex flex-col justify-between border-r-2 border-b-2 border-border p-8 md:p-10 hover:bg-accent transition-colors duration-300 overflow-hidden min-h-[220px]"
            >
              {/* Decorative index */}
              <span
                aria-hidden
                className="absolute bottom-0 right-2 font-display font-bold leading-none text-border group-hover:text-black/[0.07] transition-colors select-none pointer-events-none"
                style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
              >
                {String(a.id).padStart(2, "0")}
              </span>

              {/* Top: title */}
              <div className="relative z-10">
                <p
                  className="font-display font-black uppercase tracking-tighter text-text group-hover:text-black transition-colors leading-none"
                  style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)" }}
                >
                  {a.title}
                </p>
                {a.year && (
                  <span className="inline-block mt-2 font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-black/40 transition-colors">
                    {a.year}
                  </span>
                )}
              </div>

              {/* Bottom: event + description */}
              <div className="relative z-10 mt-6">
                <p className="font-mono text-xs text-muted group-hover:text-black/50 transition-colors uppercase tracking-widest mb-2">
                  {a.event}
                </p>
                <p className="font-sans text-sm text-muted group-hover:text-black/70 transition-colors leading-relaxed">
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
