"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SkillsScene = dynamic(() => import("./SkillsScene"), { ssr: false });

const skills = [
  { name: "JavaScript / Python", level: 88, color: "#ffff00" },
  { name: "React / Next.js", level: 84, color: "#00ffff" },
  { name: "Three.js / WebGL", level: 70, color: "#ff00ff" },
  { name: "Node.js / Express", level: 80, color: "#00ff88" },
  { name: "SQL / Databases", level: 82, color: "#ff6600" },
  { name: "Machine Learning / AI", level: 75, color: "#bf00ff" },
  { name: "Computer Vision", level: 72, color: "#00ccff" },
  { name: "UI/UX & Frontend", level: 85, color: "#ff00aa" },
];

const tools = [
  "VS Code", "Git", "GitHub", "Figma", "Vercel", "OpenCV",
  "TensorFlow", "MySQL", "Tailwind", "Linux", "Postman", "Arduino",
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animated) {
            setAnimated(true);
            e.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden flex items-center"
    >
      <SkillsScene />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(255,0,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-8 md:px-16">
        <p
          className="section-tag reveal"
          style={{ fontFamily: "'Space Mono', monospace", color: "#ffff00" }}
        >
          ✦ arsenal ✦
        </p>
        <h2
          className="reveal mt-4 mb-16"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            letterSpacing: "0.06em",
            color: "#fff",
            textShadow: "0 0 20px rgba(255,255,0,0.3)",
          }}
        >
          SKILLS & TOOLS
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-7">
            {skills.map((skill, i) => (
              <div key={skill.name} className="reveal">
                <div className="flex justify-between mb-2">
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.7)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.75rem",
                      color: skill.color,
                      textShadow: `0 0 6px ${skill.color}`,
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  style={{
                    height: "3px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: animated ? `${skill.level}%` : "0%",
                      background: `linear-gradient(90deg, ${skill.color}, transparent)`,
                      boxShadow: `0 0 8px ${skill.color}`,
                      transition: `width 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                      borderRadius: "2px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-right">
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "24px",
              }}
            >
              TOOLS & TECH
            </p>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, i) => {
                const colors = ["#ff00ff", "#00ffff", "#ffff00", "#00ff88", "#ff6600", "#bf00ff"];
                const c = colors[i % colors.length];
                return (
                  <span
                    key={tool}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.75rem",
                      padding: "8px 16px",
                      border: `1px solid ${c}40`,
                      color: c,
                      textShadow: `0 0 6px ${c}`,
                      boxShadow: `0 0 8px ${c}20`,
                      letterSpacing: "0.08em",
                      transition: "all 0.3s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 15px ${c}60`;
                      e.currentTarget.style.background = `${c}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 8px ${c}20`;
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {tool}
                  </span>
                );
              })}
            </div>

            <blockquote
              className="mt-12"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.3)",
                borderLeft: "3px solid #ff00ff",
                paddingLeft: "20px",
                lineHeight: 1.7,
              }}
            >
              &ldquo;Code is my canvas. Every project is a painting that bleeds neon.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
