"use client";

interface SkillBadgeProps {
  skill: string;
  index: number;
}

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <span className="inline-block font-display font-bold text-xs uppercase tracking-wide px-3 py-1.5 border-2 border-border text-muted hover:bg-accent hover:border-accent hover:text-black transition-all duration-200 cursor-default">
      {skill}
    </span>
  );
}
