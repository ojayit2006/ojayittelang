"use client";

import NoiseOverlay from "@/components/NoiseOverlay";
import PageHero from "@/components/PageHero";
import TimelineItem from "@/components/TimelineItem";
import { experiences } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 px-6 md:px-10">
        <PageHero
          num="02 — EXPERIENCE"
          title="Where I've Been"
          subtitle="Internships and research roles where I built real things for real stakeholders."
        />
        <div className="pb-24 pt-12 max-w-3xl">
          {experiences.map((exp, i) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
