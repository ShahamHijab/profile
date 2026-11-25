"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
const Cursor = dynamic(() => import("../components/Cursor"), { ssr: false });
const Hero = dynamic(() => import("../components/Hero"), { ssr: false });

function Preloader() {
  const [n, setN] = useState(0); const [out, setOut] = useState(false); const [gone, setGone] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setN((v) => { if (v >= 100) { clearInterval(id); setTimeout(() => setOut(true), 250); setTimeout(() => setGone(true), 1300); return 100; } return v + 4; }), 40);
    return () => clearInterval(id);
  }, []);
  if (gone) return null;
  return (
    <div className={`pre ${out ? "out" : ""}`}>
      <p style={{ font: "400 .75rem var(--mono)", color: "var(--mute)" }}>initialising portfolio…</p>
      <p className="holo" style={{ font: "italic 400 clamp(6rem,24vw,18rem)/.85 var(--serif)", letterSpacing: "-.05em" }}>{String(n).padStart(2, "0")}</p>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const m = (e) => document.querySelectorAll(".btn").forEach((b) => {
      const r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const near = Math.hypot(dx, dy) < 110;
      b.style.transform = near ? `translate(${dx * 0.25}px,${dy * 0.35}px)` : "";
    });
    addEventListener("mousemove", m); return () => removeEventListener("mousemove", m);
  }, []);
  return (
    <>
      <div className="aurora"><i /><i /><i /></div>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero /><About /><Skills /><Projects /><Resume /><Contact />
      </main>
      <Footer />
    </>
  );
}
