"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const words = ["Developer", "ML Engineer", "Vision hacker", "Interested in learning more"];
const reel = ["Computer Vision", "Next.js", "Three.js", "Deep Learning", "Python", "Automation", "AI Agents", "WebGL"];
export default function Hero() {
  const [t, setT] = useState(""); const [w, setW] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const full = words[w]; let id;
    if (!del && t === full) id = setTimeout(() => setDel(true), 1400);
    else if (del && t === "") { setDel(false); setW((w + 1) % words.length); }
    else id = setTimeout(() => setT(del ? full.slice(0, t.length - 1) : full.slice(0, t.length + 1)), del ? 35 : 75);
    return () => clearTimeout(id);
  }, [t, del, w]);
  return (
    <section id="home" className="relative h-screen min-h-[640px] flex flex-col justify-center overflow-hidden">
      <HeroScene />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%,transparent,var(--bg) 85%)" }} />
      <div className="wrap relative z-10 w-full">
        <span className="pill" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          <i style={{ width: 7, height: 7, borderRadius: 9, background: "var(--violet)", boxShadow: "0 0 10px var(--violet)", animation: "flicker 2s infinite" }} /> Open to new projects
        </span>
        <h1 className="glitch" style={{ font: "400 clamp(4.2rem,15vw,12.5rem)/.86 var(--serif)", letterSpacing: "-.04em", margin: "1.6rem 0 1.4rem" }}>
          Shaham<br /><span className="holo" style={{ fontStyle: "italic", paddingRight: ".1em" }}>Hijab</span>
        </h1>
        <p style={{ font: "400 clamp(.95rem,1.8vw,1.15rem) var(--mono)", color: "var(--chrome)", minHeight: "1.6em" }}>
          <span style={{ color: "var(--blue)" }}>~/</span> {t}<span style={{ color: "var(--pink)", animation: "flicker 1s infinite" }}>▍</span>
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: "2.2rem" }}>
          <a href="#projects" className="btn">See the work ↗</a>
          <a href="#contact" className="btn ghost">Let&apos;s talk</a>
        </div>
      </div>
      <div className="marquee absolute bottom-0 left-0 w-full pb-24 md:pb-28 pointer-events-none" style={{ opacity: .55 }}>
        {[0, 1].map((k) => <div key={k}>{reel.map((r) => <span key={r + k} style={{ font: "italic 400 2.2rem var(--serif)", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.35)" }}>{r} ✦</span>)}</div>)}
      </div>
    </section>
  );
}
