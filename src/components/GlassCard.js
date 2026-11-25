"use client";
import { useRef } from "react";
export default function GlassCard({ children, className = "", style = {}, tilt = 6, ...rest }) {
  const r = useRef(null);
  const move = (e) => {
    const b = r.current.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    r.current.style.setProperty("--mx", x * 100 + "%"); r.current.style.setProperty("--my", y * 100 + "%");
    r.current.style.transform = `perspective(900px) rotateX(${(0.5 - y) * tilt}deg) rotateY(${(x - 0.5) * tilt}deg) translateY(-4px)`;
  };
  const leave = () => { r.current.style.transform = ""; };
  return <div ref={r} className={`glass ${className}`} onMouseMove={move} onMouseLeave={leave} style={{ transition: "transform .25s ease-out", ...style }} {...rest}>{children}</div>;
}
