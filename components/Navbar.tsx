"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/",              label: "Home"          },
  { href: "/projects",      label: "Projects"      },
  { href: "/experience",    label: "Experience"    },
  { href: "/activities",    label: "Activities"    },
  { href: "/skills",        label: "Skills"        },
  { href: "/achievements",  label: "Achievements"  },
  { href: "/games",         label: "Games"         },
  { href: "/connect",       label: "Connect"       },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-md border-b-2 border-border" : "bg-transparent"
      }`}
    >
      <div className="px-6 md:px-10 flex items-center justify-between h-14">
        <Link
          href="/"
          className="font-display font-black text-lg uppercase tracking-tighter text-text hover:text-accent transition-colors"
        >
          OJ<span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative font-display font-bold text-xs uppercase tracking-widest px-4 h-14 flex items-center transition-colors duration-200 ${
                  active
                    ? "text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent"
                    : "text-muted hover:text-text"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-text transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-px w-6 bg-text transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-text transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b-2 border-border px-6 pb-6 pt-2 flex flex-col gap-0">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`font-display font-bold text-sm uppercase tracking-widest py-3 border-b border-border/40 transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
