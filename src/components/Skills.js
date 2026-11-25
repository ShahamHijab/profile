"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Reveal from "./AnimatedSection";
import GlassCard from "./GlassCard";
const SkillsScene = dynamic(() => import("./SkillsScene"), { ssr: false });
const skills = [
  ["JavaScript / Python", 88, "#d9dce6"], ["React / Next.js", 84, "#2ea8ff"], ["Three.js / WebGL", 70, "#ff3df0"], ["Node.js / Express", 80, "#a06bff"],
  ["SQL / Databases", 82, "#4dc8ff"], ["Machine Learning / AI", 75, "#a06bff"], ["Computer Vision", 72, "#ff3df0"], ["UI/UX & Frontend", 85, "#d9dce6"],
];
const tools = ["VS Code", "Git", "GitHub", "Figma", "Vercel", "OpenCV", "TensorFlow", "MySQL", "Tailwind", "Linux", "Postman", "Arduino"];
function Ring({ name, level, color, go }) {
  const R = 38, C = 2 * Math.PI * R;
  return (
    <GlassCard tilt={10} style={{ padding: "1.6rem", display: "flex", alignItems: "center", gap: "1.2rem" }}>
      <svg width="92" height="92" viewBox="0 0 92 92" style={{ flexShrink: 0 }}>
        <circle cx="46" cy="46" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="5" />
        <circle cx="46" cy="46" r={R} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={go ? C * (1 - level / 100) : C}
          transform="rotate(-90 46 46)" style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1)", filter: `drop-shadow(0 0 6px ${color})` }} />
        <text x="46" y="52" textAnchor="middle" fill="#fff" style={{ font: "400 22px var(--serif)" }}>{level}</text>
      </svg>
      <span style={{ font: "400 1.35rem/1.15 var(--serif)" }}>{name}</span>
    </GlassCard>
  );
}
export default function Skills() {
  const ref = useRef(null); const [go, setGo] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => e.isIntersecting && setGo(true), { threshold: 0.15 }); o.observe(ref.current); return () => o.disconnect(); }, []);
  return (
    <section id="skills" ref={ref} className="sec overflow-hidden">
      <SkillsScene />
      <div className="wrap relative z-10">
        <Reveal><div className="kicker">Skills</div><h2 className="h2">The <em className="chrome-text">toolkit.</em></h2></Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map(([n, l, c], i) => <Reveal key={n} delay={i * 60}><Ring name={n} level={l} color={c} go={go} /></Reveal>)}
        </div>
      </div>
      <div className="relative z-10" style={{ marginTop: "4rem", display: "grid", gap: "1rem" }}>
        {[false, true].map((rev) => (
          <div key={String(rev)} className={`marquee ${rev ? "rev" : ""}`}>
            {[0, 1].map((k) => <div key={k}>{(rev ? [...tools].reverse() : tools).map((t) => <span key={t + k} className="pill">{t}</span>)}</div>)}
          </div>
        ))}
      </div>
    </section>
  );
}
