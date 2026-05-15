"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const fullText = "Full Stack Developer";

  useEffect(() => {
    setVisible(true);
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Three.js background */}
      <HeroScene />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,0,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6"
        style={{
          transform: visible ? "translateY(0)" : "translateY(40px)",
          opacity: visible ? 1 : 0,
          transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Tag */}
        <p
          className="section-tag mb-6"
          style={{ fontFamily: "'Space Mono', monospace", color: "#00ffff" }}
        >
          ✦ welcome to my world ✦
        </p>

        {/* Name */}
        <h1
          className="glitch mb-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4rem, 12vw, 10rem)",
            letterSpacing: "0.08em",
            lineHeight: 1,
            color: "#ffffff",
            textShadow:
              "0 0 20px rgba(255,0,255,0.5), 0 0 40px rgba(255,0,255,0.3), 0 0 80px rgba(0,255,255,0.2)",
          }}
        >
          SHAHAM
        </h1>
        <h1
          className="gradient-text mb-6"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4rem, 12vw, 10rem)",
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          HIJAB
        </h1>

        {/* Typewriter role */}
        <div
          className="flex items-center justify-center gap-2 mb-10"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}
        >
          <span style={{ color: "#00ffff" }}>_</span>
          <span style={{ color: "rgba(255,255,255,0.8)" }}>{text}</span>
          <span
            style={{
              color: "#ff00ff",
              animation: "flicker 1s infinite",
              textShadow: "0 0 8px #ff00ff",
            }}
          >
            |
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#projects" className="neon-btn">
            View Projects
          </a>
          <a href="#contact" className="neon-btn neon-btn-cyan">
            Let&apos;s Talk
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.5 }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "#ff00ff",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "50px",
            background: "linear-gradient(#ff00ff, transparent)",
            animation: "shimmer 2s linear infinite",
          }}
        />
      </div>
    </section>
  );
}