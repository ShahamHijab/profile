"use client";
import { useEffect, useRef } from "react";
export default function Reveal({ children, className = "", delay = 0, style = {} }) {
  const r = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { r.current.classList.add("in"); o.disconnect(); } }, { threshold: 0.12 });
    o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return <div ref={r} className={`rv ${className}`} style={{ transitionDelay: delay + "ms", ...style }}>{children}</div>;
}
