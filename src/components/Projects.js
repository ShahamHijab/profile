"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Reveal from "./AnimatedSection";
import GlassCard from "./GlassCard";
const ProjectsScene = dynamic(() => import("./Projectsscene"), { ssr: false });
const gh = "https://github.com/ShahamHijab/";
const projects = [
  { title: "VisionBot", desc: "An AI-powered vision bot that processes and understands visual input. Built with Python and deep learning.", tags: ["Python", "AI", "Computer Vision"], color: "#ff3df0", repo: "visionbot", year: "2024", emoji: "🤖", cat: "AI & Vision" },
  { title: "ASL 3-Letters Detector", desc: "Detects American Sign Language hand signs for 3-letter words in real time using Python and computer vision.", tags: ["Python", "OpenCV", "ML"], color: "#d9dce6", repo: "ASL-3Letters-Detector-Python", year: "2024", emoji: "🤟", cat: "AI & Vision" },
  { title: "Solar Panel Cleaner", desc: "Automated solar panel cleaning system: hardware plus software that keeps panels efficient without manual effort.", tags: ["Automation", "IoT", "Python"], color: "#4dc8ff", repo: "Automated-solar-panel-cleaning-system", year: "2024", emoji: "☀️", cat: "Systems" },
  { title: "TalentTrail", desc: "A talent discovery and tracking platform that connects recruiters with candidates through smart filtering.", tags: ["Web App", "JavaScript", "Database"], color: "#a06bff", repo: "TalentTrail", year: "2024", emoji: "🎯", cat: "Web" },
  { title: "Clinic Database", desc: "A clinic management database with patient records, appointments and billing, built in SQL.", tags: ["SQL", "Database"], color: "#a06bff", repo: "Clinic-Database-System", year: "2023", emoji: "🏥", cat: "Systems" },
  { title: "Image Caption Generator", desc: "Generates natural-language captions for images automatically using deep learning and NLP.", tags: ["Python", "Deep Learning", "NLP"], color: "#2ea8ff", repo: "Image-Caption-Generator", year: "2023", emoji: "🖼️", cat: "AI & Vision" },
];
const cats = ["All", "AI & Vision", "Web", "Systems"];
export default function Projects() {
  const [f, setF] = useState("All");
  const list = projects.filter((p) => f === "All" || p.cat === f);
  return (
    <section id="projects" className="sec overflow-hidden">
      <ProjectsScene />
      <div className="wrap relative z-10">
        <Reveal><div className="kicker">Selected work</div><h2 className="h2" style={{ marginBottom: "1.5rem" }}>Things I&apos;ve <em className="holo">built.</em></h2></Reveal>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2.2rem" }}>
          {cats.map((c) => <button key={c} onClick={() => setF(c)} className="pill" style={{ cursor: "pointer", ...(f === c ? { background: "#fff", color: "#000" } : {}) }}>{c}</button>)}
        </div>
        {(f === "All" || f === "Web" || f === "AI & Vision") && (
          <Reveal>
            <GlassCard tilt={2} style={{ padding: "clamp(1.2rem,3vw,2.4rem)", marginBottom: "1rem" }}>
              <div className="grid gap-8 lg:grid-cols-5 items-center">
                <div className="lg:col-span-2">
                  <span className="pill" style={{ borderColor: "#3dffa055", color: "#3dffa0" }}>● Live on Vercel</span>
                  <h3 style={{ font: "400 clamp(2.4rem,4vw,3.4rem)/1 var(--serif)", margin: "1.2rem 0" }}>ShareSafe 🔒</h3>
                  <ul style={{ color: "var(--mute)", fontSize: ".95rem", lineHeight: 1.7, display: "grid", gap: ".8rem", listStyle: "none" }}>
                    <li>Privacy app that redacts sensitive content from images and PDFs before sharing. It detects faces and text via OCR plus pattern matching (emails, phone numbers, addresses, URLs, tokens), then exports a protected file.</li>
                    <li>Everything stays in the browser: no backend upload or storage. A review step with manual redaction boxes catches what automatic detection misses.</li>
                  </ul>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "1.4rem 0" }}>
                    {["Next.js", "OCR", "Privacy", "PDF"].map((t) => <span key={t} className="pill" style={{ fontSize: ".7rem" }}>{t}</span>)}
                  </div>
                  <a href="https://share-safe-img-pdf.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn">Open live app ↗</a>
                </div>
                <div className="lg:col-span-3 browser">
                  <div className="bar"><b style={{ background: "#ff5f57" }} /><b style={{ background: "#febc2e" }} /><b style={{ background: "#28c840" }} /><span style={{ marginLeft: 10 }}>share-safe-img-pdf.vercel.app</span></div>
                  <div className="live"><iframe src="https://share-safe-img-pdf.vercel.app/" title="ShareSafe live preview" loading="lazy" tabIndex={-1} /></div>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        )}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={i * 50}>
              <a href={gh + p.repo} target="_blank" rel="noopener noreferrer" style={{ display: "block", height: "100%" }}>
                <GlassCard style={{ padding: "2rem", height: "100%", minHeight: 260, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", font: "400 .75rem var(--mono)", color: "var(--mute)" }}>
                    <span style={{ fontSize: "2rem", filter: `drop-shadow(0 0 14px ${p.color})` }}>{p.emoji}</span><span>{p.year}</span>
                  </div>
                  <h3 style={{ font: "400 2rem/1.05 var(--serif)", margin: "1.4rem 0 .7rem", letterSpacing: "-.01em" }}>{p.title}</h3>
                  <p style={{ color: "var(--mute)", fontSize: ".92rem", lineHeight: 1.65, maxWidth: "52ch" }}>{p.desc}</p>
                  <div style={{ marginTop: "auto", paddingTop: "1.4rem", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    {p.tags.map((t) => <span key={t} className="pill" style={{ fontSize: ".7rem", padding: ".3rem .75rem", borderColor: p.color + "55" }}>{t}</span>)}
                    <span style={{ marginLeft: "auto", color: p.color, fontSize: "1.2rem" }}>↗</span>
                  </div>
                </GlassCard>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
