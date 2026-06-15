"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import NoiseOverlay from "@/components/NoiseOverlay";

const ASCIITextDynamic = dynamic(() => import("@/components/ASCIIText"), { ssr: false });

const SECTIONS = [
  { num: "01", label: "Projects", href: "/projects", desc: "built & shipped" },
  { num: "02", label: "Experience", href: "/experience", desc: "where i've been" },
  { num: "03", label: "Activities", href: "/activities", desc: "beyond the screen" },
  { num: "04", label: "Skills", href: "/skills", desc: "tools of the trade" },
  { num: "05", label: "Achievements", href: "/achievements", desc: "wins & recognition" },
  { num: "06", label: "Connect", href: "/connect", desc: "let's talk" },
];

const FACTS = [
  { label: "Currently", value: "B.Tech. Electronics & Telecommunication", sub: "SPIT, Mumbai" },
  { label: "Focus", value: "ML · Web Dev · Finance · Problem Solving", sub: null },
  { label: "Initiatives", value: "Cadira AI", sub: "AI for business" },
  { label: "Based in", value: "Mumbai, India", sub: null },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.14]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-bg text-text min-h-screen overflow-x-hidden">
      <NoiseOverlay />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        <motion.div
          className="flex-1 flex flex-col justify-center px-6 md:px-10 pt-24 pb-10"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <motion.p
            className="font-mono text-xs text-muted tracking-[0.3em] uppercase mb-6 md:mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Portfolio · 2025
          </motion.p>

          {/* ASCII hero text */}
          <motion.div
            className="relative w-full"
            style={{ height: "clamp(150px, 28vw, 420px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <ASCIITextDynamic
              text="OJAYIT TELANG"
              textColor="#DFE104"
              asciiFontSize={8}
              textFontSize={180}
              enableWaves={true}
              planeBaseHeight={8}
            />
          </motion.div>

          <motion.p
            className="mt-8 md:mt-12 font-sans text-muted leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Building intelligent systems with machine learning, computer vision,
            and quantitative analysis.
          </motion.p>

          <motion.div
            className="mt-10 md:mt-14 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.45 }}
          >
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 bg-accent text-black px-8 py-4 font-display font-bold uppercase tracking-tight text-sm hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Connect →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border-2 border-border text-text px-8 py-4 font-display font-bold uppercase tracking-tight text-sm hover:bg-text hover:text-bg hover:border-text transition-all duration-200"
            >
              View Work
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section className="border-t-2 border-border">
        <div className="grid grid-cols-1 lg:grid-cols-5">

          {/* Left: photo + identity */}
          <div className="lg:col-span-2 border-b-2 lg:border-b-0 lg:border-r-2 border-border flex flex-col">

            {/* Photo slot */}
            <div className="border-b-2 border-border p-6 md:p-8">
              <div className="relative aspect-[3/4] border-2 border-border bg-surface flex flex-col items-center justify-center gap-3 overflow-hidden group/photo">
                <Image
                  src="/ojayit.png"
                  alt="Ojayit Telang"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover grayscale group-hover/photo:grayscale-0 transition-all duration-500 scale-102 group-hover/photo:scale-100"
                  priority
                />
              </div>
            </div>

            {/* Identity facts */}
            <div className="flex flex-col flex-1">
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className={`px-6 md:px-8 py-5 ${i < FACTS.length - 1 ? "border-b-2 border-border" : ""}`}
                >
                  <p className="font-mono text-[10px] text-muted uppercase tracking-[0.25em] mb-1">
                    {f.label}
                  </p>
                  <p className="font-display font-bold text-text text-sm md:text-base">{f.value}</p>
                  {f.sub && (
                    <p className="font-mono text-xs text-muted mt-0.5">{f.sub}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: bio content */}
          <div className="lg:col-span-3 flex flex-col">

            {/* Name heading */}
            <div className="px-8 md:px-12 pt-10 pb-8 border-b-2 border-border">
              <p className="font-mono text-[10px] text-muted uppercase tracking-[0.25em] mb-4">
                About
              </p>
              <h2
                className="font-display font-black uppercase tracking-tighter text-text leading-none"
                style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
              >
                Ojayit<br />
                <span className="text-accent">Telang</span>
              </h2>
            </div>

            {/* Intro statement */}
            <div className="px-8 md:px-12 py-8 border-b-2 border-border">
              <p
                className="font-display font-semibold text-text leading-snug"
                style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
              >
                I work on problems that sit at the intersection of data,
                decision-making, and technology.
              </p>
            </div>

            {/* Bio paragraphs */}
            <div className="px-8 md:px-12 py-8 border-b-2 border-border space-y-5">
              <p className="font-sans text-muted leading-relaxed text-sm md:text-base">
                My projects range from AI-powered learning platforms and warehouse
                optimization systems to computer vision applications and financial
                market research — all driven by a curiosity for how complex systems
                behave and how they can be improved.
              </p>
              <p className="font-sans text-muted leading-relaxed text-sm md:text-base">
                Currently pursuing a Bachelor&apos;s degree in Electronics and
                Telecommunication Engineering at Sardar Patel Institute of
                Technology (SPIT), Mumbai. Before that, I studied at Lilavatibai
                Podar High School, where I developed an early interest in
                mathematics, technology, and analytical problem-solving — an
                interest that evolved into a broader fascination with artificial
                intelligence, quantitative modeling, and software systems.
              </p>
            </div>

            {/* Experience paragraph */}
            <div className="px-8 md:px-12 py-8">
              <p className="font-sans text-muted leading-relaxed text-sm md:text-base">
                Through internships, independent research, hackathons, and personal
                projects, I have explored domains ranging from machine learning and
                natural language processing to operations research, computer vision,
                and quantitative finance. I enjoy tackling complex problems that
                require both technical depth and structured thinking — whether that
                means designing an AI system, optimizing a real-world process, or
                analyzing patterns hidden within large datasets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CADIRA AI ─────────────────────────────────────────── */}
      <section className="border-t-2 border-border bg-accent">
        <div className="grid grid-cols-1 lg:grid-cols-5">

          {/* Left: label + big name */}
          <div className="lg:col-span-2 border-b-2 lg:border-b-0 lg:border-r-2 border-black/10 px-8 md:px-12 pt-10 pb-10 flex flex-col justify-between gap-8">
            <p className="font-mono text-[10px] text-black/50 uppercase tracking-[0.25em]">
              Initiative
            </p>
            <div>
              <h3
                className="font-display font-black uppercase tracking-tighter text-black leading-none"
                style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
              >
                Cadira
                <br />
                AI
              </h3>
              <p className="mt-4 font-mono text-xs text-black/50 uppercase tracking-widest">
                AI for forward-thinking businesses →
              </p>
            </div>
          </div>

          {/* Right: description */}
          <div className="lg:col-span-3 px-8 md:px-12 py-10 flex flex-col justify-center gap-6">
            <p className="font-sans text-black/80 leading-relaxed text-sm md:text-base">
              Beyond projects and research, I am exploring how artificial
              intelligence can create tangible value outside traditional technology
              environments. Cadira AI is an initiative focused on developing
              AI-powered solutions for forward-thinking businesses — from workflow
              automation and intelligent data analysis to AI-assisted
              decision-making.
            </p>
            <p className="font-sans text-black/80 leading-relaxed text-sm md:text-base">
              The goal is to help organizations harness emerging technologies in
              practical and impactful ways. Through Cadira AI, I am gaining
              firsthand experience in bridging the gap between cutting-edge AI
              capabilities and real-world business challenges — understanding not
              just what the technology can do, but what it should do.
            </p>
            <p className="font-display font-bold uppercase tracking-tight text-black/60 text-sm mt-2">
              Workflow Automation · Intelligent Analytics · AI Decision Support
            </p>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP ──────────────────────────────────── */}
      <section className="border-t-2 border-b-2 border-border px-6 md:px-10 py-10 md:py-14">
        <p
          className="font-display font-black uppercase tracking-tighter text-text leading-tight max-w-5xl"
          style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.8rem)" }}
        >
          Every project is an opportunity to understand a system more deeply,
          question assumptions, and create solutions that are not only
          technically sound but genuinely{" "}
          <span className="text-accent">useful.</span>
        </p>
      </section>

      {/* ── SECTION GRID ──────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-3 border-t-2 border-border">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative flex flex-col justify-between p-8 md:p-12 min-h-[180px] md:min-h-[240px] border-r-2 border-b-2 border-border hover:bg-accent transition-colors duration-300 overflow-hidden"
          >
            <div className="flex items-start justify-between relative z-10">
              <span className="font-mono text-xs text-muted group-hover:text-black/50 transition-colors tracking-widest">
                {s.num}
              </span>
              <span className="font-mono text-sm text-muted group-hover:text-black transition-colors">
                →
              </span>
            </div>

            <span
              aria-hidden
              className="absolute bottom-0 right-2 font-display font-bold leading-none text-border group-hover:text-black/[0.07] transition-colors select-none pointer-events-none"
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
            >
              {s.num}
            </span>

            <div className="relative z-10">
              <p
                className="font-display font-bold uppercase tracking-tighter text-text group-hover:text-black transition-colors leading-none"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
              >
                {s.label}
              </p>
              <p className="font-mono text-[10px] md:text-xs text-muted group-hover:text-black/50 transition-colors uppercase tracking-widest mt-2">
                {s.desc}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
