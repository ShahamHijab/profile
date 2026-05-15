"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const fullText = "Developer · AI Builder · Maximalist";

  useEffect(() => {
    setVisible(true);
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <HeroScene />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,0,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 text-center px-8 md:px-16 max-w-5xl mx-auto w-full"
        style={{
          transform: visible ? "translateY(0)" : "translateY(40px)",
          opacity: visible ? 1 : 0,
          transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p
          className="section-tag mb-6"
          style={{ fontFamily: "'Space Mono', monospace", color: "#00ffff" }}
        >
          ✦ welcome to my world ✦
        </p>

        <h1
          className="glitch"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4.5rem, 14vw, 11rem)",
            letterSpacing: "0.06em",
            lineHeight: 0.95,
            color: "#ffffff",
            textShadow: "0 0 20px rgba(255,0,255,0.5), 0 0 40px rgba(255,0,255,0.3)",
          }}
        >
          SHAHAM
        </h1>
        <h1
          className="gradient-text"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4.5rem, 14vw, 11rem)",
            letterSpacing: "0.06em",
            lineHeight: 0.95,
            marginBottom: "28px",
          }}
        >
          HIJAB
        </h1>

        <div
          className="flex items-center justify-center gap-2 mb-12"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
          }}
        >
          <span style={{ color: "#00ffff" }}>_</span>
          <span style={{ color: "rgba(255,255,255,0.75)" }}>{text}</span>
          <span
            style={{
              color: "#ff00ff",
              textShadow: "0 0 8px #ff00ff",
              animation: "flicker 1s infinite",
            }}
          >
            |
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
          <a
            href="#projects"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.85rem",
              letterSpacing: "0.12em",
              padding: "14px 36px",
              border: "1px solid #ff00ff",
              background: "transparent",
              color: "#ff00ff",
              textShadow: "0 0 8px #ff00ff",
              boxShadow: "0 0 12px rgba(255,0,255,0.2)",
              transition: "all 0.3s",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#ff00ff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.textShadow = "none"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ff00ff"; e.currentTarget.style.textShadow = "0 0 8px #ff00ff"; }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.85rem",
              letterSpacing: "0.12em",
              padding: "14px 36px",
              border: "1px solid #00ffff",
              background: "transparent",
              color: "#00ffff",
              textShadow: "0 0 8px #00ffff",
              boxShadow: "0 0 12px rgba(0,255,255,0.2)",
              transition: "all 0.3s",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#00ffff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.textShadow = "none"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00ffff"; e.currentTarget.style.textShadow = "0 0 8px #00ffff"; }}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.4,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "#ff00ff",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px", height: "50px",
            background: "linear-gradient(#ff00ff, transparent)",
          }}
        />
      </div>
    </section>
  );
}
