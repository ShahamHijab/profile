"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Projects Built", value: "20+" },
    { label: "Cups of Coffee", value: "∞" },
    { label: "Lines of Code", value: "50k+" },
    { label: "Years Coding", value: "3+" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <div>
          <p
            className="section-tag reveal"
            style={{ fontFamily: "'Space Mono', monospace", color: "#00ffff" }}
          >
            ✦ about me ✦
          </p>
          <h2
            className="reveal mt-4 mb-8"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              letterSpacing: "0.06em",
              color: "#fff",
              textShadow: "0 0 20px rgba(255,0,255,0.3)",
            }}
          >
            WHO AM I?
          </h2>
          <p
            className="reveal mb-6 leading-relaxed"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.75)",
              fontStyle: "italic",
            }}
          >
            I&apos;m a maximalist developer who believes software should be an{" "}
            <span className="neon-text-pink">experience</span>, not just a tool. I craft
            interactive, visually explosive digital worlds that make people feel something.
          </p>
          <p
            className="reveal mb-10 leading-relaxed"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
            }}
          >
            From Three.js universes to full-stack applications, I push every pixel until it
            screams. Based wherever the internet takes me. Obsessed with neon, noise, and making
            the web feel alive.
          </p>
          <a href="#contact" className="reveal neon-btn inline-block">
            Get In Touch
          </a>
        </div>

        {/* Right: stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal p-6 ${i % 2 === 0 ? "neon-border-pink" : "neon-border-cyan"}`}
              style={{
                background: "rgba(255,255,255,0.02)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  color: i % 2 === 0 ? "#ff00ff" : "#00ffff",
                  textShadow: `0 0 15px ${i % 2 === 0 ? "#ff00ff" : "#00ffff"}`,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.15em",
                  marginTop: "8px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}