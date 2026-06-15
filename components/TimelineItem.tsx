"use client";

import type { Experience } from "@/data/experience";

interface TimelineItemProps {
  exp: Experience;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({ exp, index, isLast }: TimelineItemProps) {
  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className="mt-1.5 size-3 border-2 border-accent bg-accent shrink-0" />
        {!isLast && <div className="flex-1 w-px bg-border mt-2" />}
      </div>

      {/* Content */}
      <div className={`${isLast ? "pb-0" : "pb-12"} flex-1`}>
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <div className="flex-1">
            <h3 className="font-display font-black uppercase tracking-tighter text-text" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}>
              {exp.role}
            </h3>
            <p className="font-sans text-muted text-sm mt-0.5">
              {exp.orgUrl ? (
                <a href={exp.orgUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  {exp.org}
                </a>
              ) : (
                exp.org
              )}{" "}
              · {exp.location}
            </p>
          </div>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest px-2 py-1 border-2 border-border text-muted">
            {exp.type}
          </span>
        </div>

        <p className="font-mono text-xs text-muted mb-4 tracking-wide">
          {exp.startDate} — {exp.endDate}
        </p>

        <ul className="space-y-2">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 font-sans text-sm text-muted leading-relaxed">
              <span className="text-accent mt-1 shrink-0">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
