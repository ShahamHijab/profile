"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const ballRef = useRef(null);
  const canvasRef = useRef(null);
  const ripples = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const colors = ["#ff00ff", "#00ffff", "#ffff00", "#00ff88", "#ff6600"];

  useEffect(() => {
    const ball = ballRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let rafId;
    let lastX = 0, lastY = 0;
    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // Add ripple from movement
      const dx = mouseRef.current.x - lastX;
      const dy = mouseRef.current.y - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 4 && frameCount % 3 === 0) {
        ripples.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          r: 0,
          alpha: 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      lastX = mouseRef.current.x;
      lastY = mouseRef.current.y;

      // Draw ripples
      ripples.current = ripples.current.filter(rip => rip.alpha > 0.01);
      for (const rip of ripples.current) {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color;
        ctx.globalAlpha = rip.alpha;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        rip.r += 2.5;
        rip.alpha *= 0.94;
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (ball) {
        ball.style.left = e.clientX + "px";
        ball.style.top = e.clientY + "px";
      }
    };
    const onDown = () => ball?.classList.add("clicking");
    const onUp = () => ball?.classList.remove("clicking");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={ballRef} className="cursor-ball" />
      <canvas ref={canvasRef} id="ripple-canvas" />
    </>
  );
}