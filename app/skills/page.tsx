"use client";

import NoiseOverlay from "@/components/NoiseOverlay";
import PageHero from "@/components/PageHero";
import SkillBadge from "@/components/SkillBadge";
import { skillGroups } from "@/data/skills";

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 px-6 md:px-10">
        <PageHero
          num="04 — SKILLS"
          title="Tools of the Trade"
          subtitle="Languages, frameworks, and technologies I work with regularly."
        />

        <div className="pb-24 pt-12 space-y-14">
          {skillGroups.map((group, gi) => (
            <div key={group.category}>
              <div className="flex items-center gap-4 mb-5">
                <p className="font-mono text-xs text-muted tracking-[0.3em] uppercase shrink-0">
                  {group.category}
                </p>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, si) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    index={gi * 10 + si}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
