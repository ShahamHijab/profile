"use client";
import { useEffect, useState } from "react";

const links = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [scrollPct, setScrollPct] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollPct((window.scrollY / total) * 100);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,5,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,0,255,0.15)" : "none",
      }}
    >
      {/* Progress bar */}
      <div
        className="h-0.5 transition-all duration-200"
        style={{
          width: `${scrollPct}%`,
          background: "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00)",
          boxShadow: "0 0 8px #ff00ff",
        }}
      />

      {/* Desktop nav */}
      <div className="hidden md:flex justify-between items-center px-12 py-4">
        <span
          className="text-2xl font-bold"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.15em",
            color: "#ff00ff",
            textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff",
          }}
        >
          SH
        </span>
        <div className="flex gap-8">
          {links.map((name) => (
            <a
              key={name}
              href={`#${name.toLowerCase()}`}
              className="text-sm tracking-widest uppercase transition-all duration-300 hover:text-[#ff00ff]"
              style={{
                fontFamily: "'Space Mono', monospace",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                const target = e.target;
                if (target instanceof HTMLElement) {
                  target.style.textShadow = "0 0 8px #ff00ff, 0 0 16px #ff00ff";
                  target.style.color = "#ff00ff";
                }
              }}
              onMouseLeave={(e) => {
                const target = e.target;
                if (target instanceof HTMLElement) {
                  target.style.textShadow = "none";
                  target.style.color = "rgba(255,255,255,0.7)";
                }
              }}
            >
              {name}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex md:hidden justify-between items-center px-6 py-4">
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.5rem",
            color: "#ff00ff",
            textShadow: "0 0 10px #ff00ff",
            letterSpacing: "0.15em",
          }}
        >
          SH
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl"
          aria-label="Toggle menu"
          style={{ color: "#ff00ff", textShadow: "0 0 8px #ff00ff" }}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isOpen ? "400px" : "0",
          opacity: isOpen ? 1 : 0,
          background: "rgba(5,5,5,0.97)",
        }}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          {links.map((name) => (
            <a
              key={name}
              href={`#${name.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "'Space Mono', monospace",
                color: "#ff00ff",
                textShadow: "0 0 8px #ff00ff",
                fontSize: "1.1rem",
                letterSpacing: "0.2em",
              }}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}