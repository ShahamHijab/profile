"use client";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const socials = [
    { label: "GitHub", href: "https://github.com/ShahamHijab", color: "#ff00ff" },
    { label: "Email", href: "mailto:shahamhijab@proton.me", color: "#00ff88" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden flex items-center"
    >
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 30% 100%, rgba(0,255,136,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-8 md:px-16">
        <p
          className="section-tag reveal"
          style={{ fontFamily: "'Space Mono', monospace", color: "#00ff88" }}
        >
          ✦ let&apos;s connect ✦
        </p>
        <h2
          className="reveal mt-4 mb-16"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            letterSpacing: "0.06em",
            color: "#fff",
            textShadow: "0 0 20px rgba(0,255,136,0.3)",
          }}
        >
          GET IN TOUCH
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p
              className="reveal mb-8 leading-relaxed"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.15rem",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Got a project idea? Want to collaborate? Or just want to talk about AI and neon lights?
              I&apos;m all ears.
            </p>

            <div className="reveal space-y-5 mb-10">
              {[
                { label: "EMAIL", value: "shahamhijab@proton.me" },
                { label: "GITHUB", value: "github.com/ShahamHijab" },
                { label: "STATUS", value: "● Available for projects", green: true },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.45)",
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  <span style={{ color: "#00ff88", minWidth: "80px" }}>→ {item.label}</span>
                  <span style={item.green ? { color: "#00ff88", textShadow: "0 0 6px #00ff88" } : {}}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="reveal flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.75rem",
                    padding: "10px 22px",
                    border: `1px solid ${s.color}40`,
                    color: s.color,
                    textShadow: `0 0 6px ${s.color}`,
                    letterSpacing: "0.1em",
                    transition: "all 0.3s",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${s.color}15`;
                    e.currentTarget.style.boxShadow = `0 0 15px ${s.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal-right">
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { name: "name", label: "NAME", placeholder: "Your name", type: "text" },
                  { name: "email", label: "EMAIL", placeholder: "your@email.com", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.65rem",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.2em",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      className="neon-input"
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={handleChange}
                      required
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.2em",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  SUBJECT
                </label>
                <input
                  className="neon-input"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.2em",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  className="neon-input"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me everything..."
                  rows={5}
                  style={{ resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                className="neon-btn"
                disabled={status === "sending"}
                style={{
                  opacity: status === "sending" ? 0.6 : 1,
                  width: "100%",
                  padding: "16px 32px",
                  fontSize: "0.9rem",
                  letterSpacing: "0.15em",
                }}
              >
                {status === "sending" ? "TRANSMITTING..." : "SEND MESSAGE →"}
              </button>

              {status === "success" && (
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.8rem",
                    color: "#00ff88",
                    textShadow: "0 0 8px #00ff88",
                    textAlign: "center",
                    letterSpacing: "0.1em",
                    padding: "12px",
                    border: "1px solid #00ff8840",
                  }}
                >
                  ✓ MESSAGE RECEIVED. I&apos;LL BE IN TOUCH.
                </p>
              )}
              {status === "error" && (
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.8rem",
                    color: "#ff6600",
                    textShadow: "0 0 8px #ff6600",
                    textAlign: "center",
                    letterSpacing: "0.1em",
                    padding: "12px",
                    border: "1px solid #ff660040",
                  }}
                >
                  ✗ {errorMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
