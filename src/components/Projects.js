"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ProjectsScene = dynamic(() => import("./ProjectsScene"), { ssr: false });

const projects = [
  {
    title: "NeonOS",
    desc: "A browser-based OS simulation with draggable windows, a terminal, and a neon aesthetic. Built with React and custom drag logic.",
    tags: ["React", "CSS", "JavaScript"],
    color: "#ff00ff",
    repo: "https://github.com/shahamhijab/neonos",
    year: "2024",
    emoji: "🖥️",
  },
  {
    title: "Pulse API",
    desc: "High-performance REST API with real-time WebSocket support, JWT auth, and rate limiting. Handles 10k+ requests/minute.",
    tags: ["Node.js", "Express", "PostgreSQL"],
    color: "#00ffff",
    repo: "https://github.com/shahamhijab/pulse-api",
    year: "2024",
    emoji: "⚡",
  },
  {
    title: "Cosmos 3D",
    desc: "Interactive solar system simulation using Three.js with realistic orbital mechanics, textures, and a cinematic camera system.",
    tags: ["Three.js", "WebGL", "GSAP"],
    color: "#ffff00",
    repo: "https://github.com/shahamhijab/cosmos3d",
    year: "2023",
    emoji: "🌌",
  },
  {
    title: "DropZone",
    desc: "A real-time file sharing platform with drag-and-drop uploads, shareable links, and end-to-end encryption.",
    tags: ["Next.js", "AWS S3", "Prisma"],
    color: "#00ff88",
    repo: "https://github.com/shahamhijab/dropzone",
    year: "2023",
    emoji: "📁",
  },
  {
    title: "ChromaUI",
    desc: "An open-source component library with 40+ neon-styled, fully accessible React components. Used by 500+ developers.",
    tags: ["React", "TypeScript", "Storybook"],
    color: "#ff6600",
    repo: "https://github.com/shahamhijab/chromaui",
    year: "2024",
    emoji: "🎨",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      <ProjectsScene />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(255,255,0,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p
          className="section-tag reveal"
          style={{ fontFamily: "'Space Mono', monospace", color: "#ff6600" }}
        >
          ✦ my work ✦
        </p>
        <h2
          className="reveal mt-4 mb-4"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            letterSpacing: "0.06em",
            color: "#fff",
            textShadow: "0 0 20px rgba(255,102,0,0.3)",
          }}
        >
          PROJECTS
        </h2>
        <p
          className="reveal mb-16"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          → CLICK ANY CARD TO OPEN THE REPOSITORY
        </p>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="project-card reveal"
              onClick={() => window.open(p.repo, "_blank")}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${p.color}30`,
                padding: "28px",
                position: "relative",
                overflow: "hidden",
                animationDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${p.color}80`;
                e.currentTarget.style.boxShadow = `0 0 30px ${p.color}20, inset 0 0 30px ${p.color}05`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${p.color}30`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Corner accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "60px",
                  height: "60px",
                  background: `linear-gradient(225deg, ${p.color}20, transparent)`,
                }}
              />

              {/* Year */}
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.65rem",
                  color: `${p.color}80`,
                  letterSpacing: "0.2em",
                  marginBottom: "16px",
                }}
              >
                {p.year}
              </div>

              {/* Emoji + title */}
              <div className="flex items-start gap-3 mb-4">
                <span style={{ fontSize: "1.8rem" }}>{p.emoji}</span>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.8rem",
                    letterSpacing: "0.08em",
                    color: p.color,
                    textShadow: `0 0 10px ${p.color}60`,
                    lineHeight: 1.1,
                  }}
                >
                  {p.title}
                </h3>
              </div>

              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                {p.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.62rem",
                      padding: "3px 10px",
                      border: `1px solid ${p.color}40`,
                      color: p.color,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom arrow */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "20px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  color: `${p.color}60`,
                  letterSpacing: "0.1em",
                }}
              >
                REPO →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}