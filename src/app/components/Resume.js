"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ResumeModal = dynamic(() => import("./ResumeModal"), { ssr: false });

export default function Resume() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="relative py-24 px-6 flex flex-col items-center text-center overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(191,0,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <p
          className="section-tag reveal"
          style={{ fontFamily: "'Space Mono', monospace", color: "#bf00ff" }}
        >
          ✦ credentials ✦
        </p>
        <h2
          className="reveal mt-4 mb-6"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            letterSpacing: "0.06em",
            color: "#fff",
            textShadow: "0 0 20px rgba(191,0,255,0.4)",
          }}
        >
          MY RESUME
        </h2>
        <p
          className="reveal mb-2 max-w-md mx-auto"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.8,
          }}
        >
          View it right here, or download the PDF. No email required.
        </p>

        <div className="reveal">
          <ResumeModal />
        </div>
      </div>
    </section>
  );
}