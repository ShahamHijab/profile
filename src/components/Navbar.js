"use client";
import { useEffect, useState } from "react";
const links = ["Home", "About", "Skills", "Projects", "Resume", "Contact"];
export default function Navbar() {
  const [on, setOn] = useState("home");
  useEffect(() => {
    const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setOn(e.target.id)), { rootMargin: "-45% 0px -45% 0px" });
    links.forEach((l) => { const el = document.getElementById(l.toLowerCase()); el && o.observe(el); });
    return () => o.disconnect();
  }, []);
  return (
    <>
      <a href="#home" style={{ position: "fixed", top: 22, left: "clamp(1.25rem,4vw,2.5rem)", zIndex: 80, font: "400 1.7rem var(--serif)", fontStyle: "italic", mixBlendMode: "difference" }}>sh.</a>
      <nav className="dock" aria-label="Sections">
        {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className={on === l.toLowerCase() ? "on" : ""}>{l}</a>)}
      </nav>
    </>
  );
}
