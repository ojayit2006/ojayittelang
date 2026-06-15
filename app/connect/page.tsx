"use client";

import { motion } from "framer-motion";
import { InlineWidget } from "react-calendly";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageHero from "@/components/PageHero";
import { Code2, Briefcase, XIcon, Mail, ExternalLink } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    handle: "@ojayittelang",
    href: "https://github.com/ojayittelang",
    icon: Code2,
  },
  {
    label: "LinkedIn",
    handle: "ojayittelang",
    href: "https://linkedin.com/in/ojayittelang",
    icon: Briefcase,
  },
  {
    label: "Twitter / X",
    handle: "@ojayittelang",
    href: "https://twitter.com/ojayittelang",
    icon: XIcon,
  },
  {
    label: "Email",
    handle: "ojayittelang@gmail.com",
    href: "mailto:ojayittelang@gmail.com",
    icon: Mail,
  },
];

const CALENDLY_URL = "https://calendly.com/ojayittelang";

export default function ConnectPage() {
  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 px-6 md:px-10">
        <PageHero
          num="06 — CONNECT"
          title="Let's Talk"
          subtitle="Book a time, send a message, or find me on socials."
        />

        <div className="pb-24 pt-12 grid grid-cols-1 lg:grid-cols-5 gap-0 border-2 border-border">
          {/* Calendly embed */}
          <motion.div
            className="lg:col-span-3 border-b-2 lg:border-b-0 lg:border-r-2 border-border overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="px-5 py-4 border-b-2 border-border">
              <p className="font-display font-bold uppercase tracking-wide text-sm text-text">Book a meeting</p>
              <p className="font-mono text-xs text-muted mt-0.5">Pick a slot that works for you</p>
            </div>
            <InlineWidget
              url={CALENDLY_URL}
              styles={{ height: "500px", minWidth: "auto" }}
              pageSettings={{
                backgroundColor: "09090B",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "DFE104",
                textColor: "FAFAFA",
              }}
            />
          </motion.div>

          {/* Social links */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="px-6 py-6 border-b-2 border-border">
              <p className="font-display font-black uppercase tracking-tighter text-xl text-text">Find me online</p>
              <p className="font-sans text-sm text-muted mt-2 leading-relaxed">
                Always open to interesting projects, collaborations, or just a good conversation.
              </p>
            </div>

            <div className="flex flex-col">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 px-6 py-5 border-b-2 border-border hover:bg-accent transition-colors duration-200"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-muted group-hover:text-black transition-colors" />
                      <div>
                        <p className="font-display font-bold text-sm uppercase tracking-wide text-text group-hover:text-black transition-colors">
                          {s.label}
                        </p>
                        <p className="font-mono text-xs text-muted group-hover:text-black/50 transition-colors">
                          {s.handle}
                        </p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted group-hover:text-black transition-colors" />
                  </motion.a>
                );
              })}
            </div>

            <div className="px-6 py-5">
              <p className="font-mono text-xs text-muted mb-1 tracking-[0.3em] uppercase">Response time</p>
              <p className="font-sans text-sm text-text">Usually within 24–48 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
