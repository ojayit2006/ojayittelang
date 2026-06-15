"use client";

import NoiseOverlay from "@/components/NoiseOverlay";
import PageHero from "@/components/PageHero";
import { activities } from "@/data/activities";

export default function ActivitiesPage() {
  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 px-6 md:px-10">
        <PageHero
          num="03 — ACTIVITIES"
          title="Beyond the Screen"
          subtitle="Student orgs, leadership roles, and the work that happened outside of class."
        />

        <div className="pb-24 pt-12 grid grid-cols-1 md:grid-cols-2 gap-0 border-l-2 border-t-2 border-border">
          {activities.map((act, i) => (
            <div
              key={act.id}
              className="group relative border-r-2 border-b-2 border-border p-6 md:p-8 hover:bg-accent transition-colors duration-300 overflow-hidden"
            >
              {/* Category badge */}
              <span className="inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border-2 border-border text-muted group-hover:border-black/20 group-hover:text-black/50 transition-colors mb-3">
                {act.category}
              </span>

              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-black uppercase tracking-tighter text-text group-hover:text-black transition-colors" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}>
                  {act.title}
                </h3>
                <p className="font-mono text-xs text-muted group-hover:text-black/50 transition-colors shrink-0 pt-1">
                  {act.period}
                </p>
              </div>

              <p className="font-sans text-xs text-muted group-hover:text-black/50 transition-colors mt-0.5 mb-3">
                {act.org} · {act.role}
              </p>

              <p className="font-sans text-sm text-muted group-hover:text-black/70 transition-colors leading-relaxed">
                {act.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {act.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 border-2 border-border text-muted2 group-hover:border-black/20 group-hover:text-black/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
