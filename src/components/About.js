"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./AnimatedSection";
import GlassCard from "./GlassCard";
function Count({ to, suffix = "" }) {
  const r = useRef(null); const [n, setN] = useState(0);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; o.disconnect(); let s = null;
      const f = (ts) => { s ??= ts; const p = Math.min((ts - s) / 1400, 1); setN(Math.round(to * (1 - Math.pow(1 - p, 4)))); p < 1 && requestAnimationFrame(f); };
      requestAnimationFrame(f);
    }); o.observe(r.current); return () => o.disconnect();
  }, [to]);
  return <span ref={r}>{n}{suffix}</span>;
}
export default function About() {
  const big = { font: "400 clamp(3.4rem,7vw,5.5rem)/1 var(--serif)", letterSpacing: "-.03em" };
  const cap = { font: "400 .78rem var(--mono)", color: "var(--mute)", marginTop: ".6rem" };
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">About</div><h2 className="h2">Software that feels <em className="holo">alive.</em></h2></Reveal>
        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4"><GlassCard style={{ padding: "2.4rem", height: "100%" }}>
            <p style={{ font: "400 clamp(1.5rem,2.8vw,2.2rem)/1.25 var(--serif)" }}>I build software that&apos;s an experience, not just a tool, from AI detectors to full-stack platforms to automated agents that do the boring parts for you.</p>
            <a href="#contact" className="btn ghost" style={{ marginTop: "2rem" }}>Get in touch ↗</a>
          </GlassCard></Reveal>
          <Reveal className="md:col-span-2" delay={100}><GlassCard style={{ padding: "2rem", height: "100%" }}><div style={big} className="holo"><Count to={8} suffix="+" /></div><div style={cap}>projects shipped</div></GlassCard></Reveal>
          <Reveal className="md:col-span-2" delay={150}><GlassCard style={{ padding: "2rem" }}><div style={big}><Count to={15} suffix="+" /></div><div style={cap}>technologies</div></GlassCard></Reveal>
          <Reveal className="md:col-span-2" delay={200}><GlassCard style={{ padding: "2rem" }}><div style={big}><Count to={3} suffix="+" /></div><div style={cap}>years coding</div></GlassCard></Reveal>
          <Reveal className="md:col-span-2" delay={250}><GlassCard style={{ padding: "2rem" }}><div style={big} className="holo">∞</div><div style={cap}>cups of coffee</div></GlassCard></Reveal>
        </div>
      </div>
    </section>
  );
}
