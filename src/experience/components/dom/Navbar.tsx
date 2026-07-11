import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import type { SectionId } from "@/lib/journey";
import { PROFILE } from "@/lib/data";
import { scrollToSection, useCurrentSection, useScrollRaf } from "@/lib/scroll";

const LINKS: { id: SectionId; num: string; label: string }[] = [
  { id: "about", num: "01", label: "About" },
  { id: "experience", num: "02", label: "Work" },
  { id: "projects", num: "03", label: "Projects" },
  { id: "contact", num: "04", label: "Contact" },
];

export default function Navbar() {
  const barRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // hero/launch/skills aren't nav links — no link is active during those.
  const active: SectionId = useCurrentSection();

  const goTo = (id: SectionId) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  useScrollRaf((p) => {
    const scrolled = p > 0.02;
    if (scrolled === scrolledRef.current) return;
    scrolledRef.current = scrolled;
    const bar = barRef.current;
    const line = lineRef.current;
    if (!bar || !line) return;
    bar.classList.toggle("glass", scrolled);
    line.style.opacity = scrolled ? "1" : "0";
  });

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40"
    >
      <div
        ref={barRef}
        className="relative flex h-20 w-full items-center justify-between px-8 transition-[background,box-shadow] duration-500 lg:px-14"
      >
        {/* Logo */}
        <button
          type="button"
          data-cursor
          onClick={() => scrollToSection("hero")}
          className="pointer-events-auto"
          aria-label="Back to top"
        >
          <span className="font-display text-2xl font-bold leading-none text-star">
            rh<span className="text-cyan">.</span>
          </span>
        </button>

        {/* Center links */}
        <nav className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                type="button"
                data-cursor
                onClick={() => scrollToSection(link.id)}
                className={`relative py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                  isActive ? "text-cyan" : "text-star/60 hover:text-star"
                }`}
              >
                <span className="mr-1.5 text-[9px] text-cyan">{link.num}.</span>
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-x-0 -bottom-px h-px bg-cyan shadow-[0_0_10px_rgba(76,201,240,0.9)]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href="/"
            data-cursor
            className="hidden items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-hud text-star/60 transition-colors duration-300 hover:text-star sm:inline-flex"
            aria-label="Back to the main site"
          >
            ← Main site
          </a>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="rounded-full border border-cyan/60 px-4 py-2 font-mono text-xs uppercase tracking-hud text-cyan-bright transition-all duration-300 hover:bg-cyan/15 hover:shadow-[0_0_24px_rgba(76,201,240,0.4)] lg:px-6"
          >
            Résumé ↗
          </a>
          {/* Mobile menu toggle */}
          <button
            type="button"
            data-cursor
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hud/40 text-star transition-colors hover:border-cyan hover:text-cyan lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Bottom hairline — appears once scrolled */}
        <div
          ref={lineRef}
          className="hud-line absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-500"
        />
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                "linear-gradient(150deg, rgba(14,20,42,0.985), rgba(6,8,20,0.985))",
              boxShadow:
                "0 20px 50px rgba(2,4,12,0.6), 0 0 24px rgba(76,201,240,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
            className="pointer-events-auto absolute inset-x-3 top-[72px] flex flex-col gap-1 rounded-2xl border border-hud/30 p-3 lg:hidden"
          >
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => goTo(link.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left font-mono text-sm uppercase tracking-[0.18em] transition-colors ${
                  active === link.id ? "bg-cyan/10 text-cyan" : "text-star/80 hover:bg-white/5 hover:text-star"
                }`}
              >
                <span className="text-[10px] text-cyan">{link.num}.</span>
                {link.label}
              </button>
            ))}
            <a
              href="/"
              className="mt-1 flex items-center gap-3 rounded-xl border-t border-white/10 px-4 py-3 font-mono text-sm uppercase tracking-[0.18em] text-star/70 transition-colors hover:bg-white/5 hover:text-star"
            >
              ← Main site
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
