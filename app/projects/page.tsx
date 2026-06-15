"use client";

import NoiseOverlay from "@/components/NoiseOverlay";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 px-6 md:px-10">
        <PageHero
          num="01 — PROJECTS"
          title="Things I Built"
          subtitle="A selection of projects — from full-stack apps to research tools."
        />
        <div className="pb-24">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
