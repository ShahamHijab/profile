"use client";
import { useState } from "react";

export default function ResumeModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            padding: "14px 36px",
            border: "1px solid #ffff00",
            background: "transparent",
            color: "#ffff00",
            cursor: "pointer",
            textShadow: "0 0 8px #ffff00",
            boxShadow: "0 0 12px rgba(255,255,0,0.2)",
            transition: "all 0.3s",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ffff00";
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.textShadow = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#ffff00";
            e.currentTarget.style.textShadow = "0 0 8px #ffff00";
          }}
        >
          👁 VIEW RESUME
        </button>
        <a
          href="/resume.pdf"
          download
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            padding: "14px 36px",
            border: "1px solid #00ffff",
            background: "transparent",
            color: "#00ffff",
            cursor: "pointer",
            textShadow: "0 0 8px #00ffff",
            boxShadow: "0 0 12px rgba(0,255,255,0.2)",
            transition: "all 0.3s",
            textDecoration: "none",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#00ffff";
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.textShadow = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#00ffff";
            e.currentTarget.style.textShadow = "0 0 8px #00ffff";
          }}
        >
          ↓ DOWNLOAD PDF
        </a>
      </div>

      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(10px)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            className="resume-modal"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "800px",
              maxHeight: "90vh",
              border: "1px solid #ff00ff",
              boxShadow: "0 0 40px #ff00ff, 0 0 80px rgba(255,0,255,0.3)",
              background: "#050505",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1px solid rgba(255,0,255,0.2)",
                background: "rgba(255,0,255,0.04)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.3rem",
                  letterSpacing: "0.2em",
                  color: "#ff00ff",
                  textShadow: "0 0 10px #ff00ff",
                }}
              >
                RESUME.PDF
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <a
                  href="/resume.pdf"
                  download
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#00ffff",
                    textShadow: "0 0 6px #00ffff",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                  }}
                >
                  ↓ DOWNLOAD
                </a>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    color: "#ff00ff",
                    fontSize: "1.1rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textShadow: "0 0 8px #ff00ff",
                    padding: "4px 8px",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* PDF iframe */}
            <div style={{ flex: 1, overflow: "auto", minHeight: "400px", position: "relative" }}>
              <iframe
                src="/resume.pdf#toolbar=0"
                style={{ width: "100%", height: "100%", minHeight: "500px", border: "none" }}
                title="Resume"
              />
              {/* Fallback message underneath the iframe */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  padding: "40px 20px",
                  fontFamily: "'Space Mono', monospace",
                  color: "rgba(255,255,255,0.25)",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  gap: "16px",
                  zIndex: -1,
                  pointerEvents: "none",
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>📄</span>
                <p>
                  Place your <span style={{ color: "#ff00ff" }}>resume.pdf</span> in the{" "}
                  <span style={{ color: "#00ffff" }}>/public</span> folder
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
