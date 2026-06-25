"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ProjectsScene = dynamic(() => import("./Projectsscene"), { ssr: false });

const projects = [
  {
    title: "VisionBot",
    desc: "An AI-powered vision bot that processes and understands visual input. Built with Python and deep learning.",
    tags: ["Python", "AI", "Computer Vision"],
    color: "#ff00ff",
    repo: "https://github.com/ShahamHijab/visionbot",
    year: "2024",
    emoji: "🤖",
  },
  {
    title: "Netixsol Internship",
    desc: "A collection of web development projects built during my internship at Netixsol — includes full websites and components.",
    tags: ["HTML", "CSS", "JavaScript", "Web Dev"],
    color: "#00ffff",
    repo: "https://github.com/ShahamHijab/Netixsol-Internship",
    year: "2024",
    emoji: "💼",
  },
  {
    title: "ASL 3-Letters Detector",
    desc: "Detects American Sign Language hand signs for 3-letter words in real time using Python and computer vision.",
    tags: ["Python", "OpenCV", "ML"],
    color: "#ffff00",
    repo: "https://github.com/ShahamHijab/ASL-3Letters-Detector-Python",
    year: "2024",
    emoji: "🤟",
  },
  {
    title: "Solar Panel Cleaner",
    desc: "Automated solar panel cleaning system — hardware + software project that keeps panels efficient without manual effort.",
    tags: ["Automation", "IoT", "Python"],
    color: "#00ff88",
    repo: "https://github.com/ShahamHijab/Automated-solar-panel-cleaning-system",
    year: "2024",
    emoji: "☀️",
  },
  {
    title: "TalentTrail",
    desc: "A talent discovery and tracking platform that connects recruiters with candidates through smart filtering.",
    tags: ["Web App", "JavaScript", "Database"],
    color: "#ff6600",
    repo: "https://github.com/ShahamHijab/TalentTrail",
    year: "2024",
    emoji: "🎯",
  },
  {
    title: "Clinic Database",
    desc: "A full clinic management database system with patient records, appointments, and billing — built in SQL.",
    tags: ["SQL", "Database", "Systems"],
    color: "#bf00ff",
    repo: "https://github.com/ShahamHijab/Clinic-Database-System",
    year: "2023",
    emoji: "🏥",
  },
  {
    title: "Code Breaker",
    desc: "A cryptography/puzzle game where players crack codes and ciphers across escalating levels of difficulty.",
    tags: ["Game", "Python", "Logic"],
    color: "#ff00aa",
    repo: "https://github.com/ShahamHijab/Code-Breaker",
    year: "2023",
    emoji: "🔐",
  },
  {
    title: "Image Caption Generator",
    desc: "Generates natural language captions for images automatically using deep learning and NLP models.",
    tags: ["Python", "Deep Learning", "NLP"],
    color: "#00ccff",
    repo: "https://github.com/ShahamHijab/Image-Caption-Generator",
    year: "2023",
    emoji: "🖼️",
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
              setTimeout(() => el.classList.add("visible"), i * 80);
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
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <ProjectsScene />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(255,255,0,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="project-card reveal"
              onClick={() => window.open(p.repo, "_blank")}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${p.color}30`,
                padding: "28px 28px 48px 28px",
                position: "relative",
                overflow: "hidden",
                borderRadius: "2px",
                animationDelay: `${i * 0.1}s`,
                cursor: "pointer",
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
              <div
                style={{
                  position: "absolute", top: 0, right: 0,
                  width: "60px", height: "60px",
                  background: `linear-gradient(225deg, ${p.color}20, transparent)`,
                }}
              />

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

              <div className="flex items-start gap-3 mb-4">
                <span style={{ fontSize: "1.8rem" }}>{p.emoji}</span>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.7rem",
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
                  fontSize: "0.76rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.75,
                  marginBottom: "20px",
                }}
              >
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.62rem",
                      padding: "4px 12px",
                      border: `1px solid ${p.color}40`,
                      color: p.color,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                style={{
                  position: "absolute", bottom: "16px", right: "20px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  color: `${p.color}70`,
                  letterSpacing: "0.1em",
                }}
              >
                GITHUB →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
