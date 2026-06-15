"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  num: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ num, title, subtitle }: PageHeroProps) {
  return (
    <div className="pt-28 pb-12 px-6 md:px-10 border-b-2 border-border">
      <motion.p
        className="font-mono text-xs text-muted tracking-[0.3em] uppercase mb-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {num}
      </motion.p>
      <div className="overflow-hidden">
        <motion.h1
          className="font-display font-black uppercase leading-none tracking-tighter text-text"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          {title}
        </motion.h1>
      </div>
      {subtitle && (
        <motion.p
          className="mt-5 font-sans text-muted text-sm md:text-base max-w-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
