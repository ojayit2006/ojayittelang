"use client";

import Link from "next/link";
import { ExternalLink, Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  flip?: boolean;
}

export default function ProjectCard({ project, index, flip = false }: ProjectCardProps) {
  return (
    <div
      className={`group relative flex flex-col md:flex-row ${
        flip ? "md:flex-row-reverse" : ""
      } gap-8 md:gap-16 items-start py-10 md:py-14 border-b-2 border-border hover:bg-accent transition-colors duration-300 px-4 md:px-8 -mx-4 md:-mx-8`}
    >
      {/* Background number */}
      <span
        aria-hidden
        className="select-none pointer-events-none absolute top-6 right-4 font-display font-black leading-none text-border group-hover:text-black/[0.07] transition-colors"
        style={{ fontSize: "clamp(5rem, 15vw, 10rem)" }}
      >
        {String(project.id).padStart(2, "0")}
      </span>

      {/* Year + type column */}
      <div className="md:w-28 shrink-0 flex md:flex-col gap-3 md:gap-2 pt-1">
        <p className="font-mono text-xs text-muted group-hover:text-black/50 transition-colors tracking-widest">
          {project.year}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10 max-w-2xl">
        <h2
          className="font-display font-black uppercase tracking-tighter text-text group-hover:text-black transition-colors leading-none"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
        >
          {project.title}
        </h2>

        <p className="mt-4 font-sans text-muted group-hover:text-black/65 transition-colors leading-relaxed text-base">
          {project.description}
        </p>

        {/* Stack */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2.5 py-1 border-2 border-border text-muted group-hover:border-black/20 group-hover:text-black/60 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex items-center gap-6">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-muted group-hover:text-black/60 hover:!text-black transition-colors"
            >
              <Code2 size={14} />
              GitHub
            </Link>
          )}
          {project.live && (
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-accent group-hover:text-black hover:!text-black transition-colors"
            >
              <ExternalLink size={14} />
              Live Site
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
