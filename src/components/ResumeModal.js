"use client";
import { useEffect, useState } from "react";

export default function ResumeModal() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const closeModal = () => {
    setLoadFailed(false);
    setOpen(false);
  };

  useEffect(() => {
    // Inline embeds (object/iframe) are unreliable on phones — most mobile
    // browsers have no built-in PDF renderer for embedded content, so we
    // send mobile users straight to the PDF instead of a broken preview.
    const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches;
    const smallScreen = window.innerWidth < 768;
    setIsMobile(Boolean(coarsePointer && smallScreen));
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
        {isMobile ? (
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="chrome-btn"
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            👁 VIEW RESUME
          </a>
        ) : (
          <button
            onClick={() => { setLoadFailed(false); setOpen(true); }}
            className="chrome-btn"
          >
            👁 VIEW RESUME
          </button>
        )}
        <a
          href="/resume.pdf"
          download
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            padding: "14px 36px",
            border: "1px solid #2ea8ff",
            background: "transparent",
            color: "#2ea8ff",
            cursor: "pointer",
            xShadow: "0 0 8px #2ea8ff",
            boxShadow: "0 0 12px rgba(0,170,255,0.2)",
            transition: "all 0.3s",
            textDecoration: "none",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2ea8ff";
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.xShadow = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#2ea8ff";
            e.currentTarget.style.xShadow = "0 0 8px #2ea8ff";
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
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="resume-modal chrome-border"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "800px",
              maxHeight: "90vh",
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
                borderBottom: "1px solid rgba(200,204,212,0.2)",
                background: "rgba(200,204,212,0.04)",
                flexShrink: 0,
              }}
            >
              <span
                className="chrome-text"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "1.3rem",
                  letterSpacing: "0.2em",
                }}
              >
                Résumé
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#ff3df0",
                    xShadow: "0 0 6px #ff3df0",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                  }}
                >
                  ↗ OPEN
                </a>
                <a
                  href="/resume.pdf"
                  download
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#2ea8ff",
                    xShadow: "0 0 6px #2ea8ff",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                  }}
                >
                  ↓ DOWNLOAD
                </a>
                <button
                  onClick={closeModal}
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    color: "#c8ccd4",
                    fontSize: "0.8rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(200,204,212,0.25)",
                    cursor: "pointer",
                    xShadow: "0 0 8px #c8ccd4",
                    padding: "6px 10px",
                    letterSpacing: "0.12em",
                  }}
                >
                  ✕ CLOSE
                </button>
              </div>
            </div>

            {/* PDF preview — <object> (unlike <iframe>) renders its children as a
                genuine fallback when the browser can't display the resource. */}
            <div style={{ flex: 1, overflow: "auto", minHeight: "400px", position: "relative" }}>
              {loadFailed ? (
                <div
                  style={{
                    height: "100%", minHeight: "500px",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    padding: "40px 20px",
                    fontFamily: "'Geist Mono', monospace",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.85rem",
                    textAlign: "center",
                    gap: "16px",
                  }}
                >
                  <span style={{ fontSize: "2.5rem" }}>📄</span>
                  <p>
                    Couldn&apos;t preview the PDF inline in this browser.
                  </p>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chrome-btn"
                    style={{ textDecoration: "none", fontSize: "0.8rem", padding: "10px 24px" }}
                  >
                    OPEN IN NEW TAB
                  </a>
                </div>
              ) : (
                <object
                  data="/resume.pdf#toolbar=0"
                  type="application/pdf"
                  style={{ width: "100%", height: "100%", minHeight: "500px" }}
                  aria-label="Resume PDF preview"
                  onError={() => setLoadFailed(true)}
                >
                  {/* This renders only when the browser truly can't display the PDF */}
                  <div
                    style={{
                      height: "100%", minHeight: "500px",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      padding: "40px 20px",
                      fontFamily: "'Geist Mono', monospace",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.85rem",
                      textAlign: "center",
                      gap: "16px",
                    }}
                  >
                    <span style={{ fontSize: "2.5rem" }}>📄</span>
                    <p>Your browser can&apos;t preview PDFs inline.</p>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chrome-btn"
                      style={{ textDecoration: "none", fontSize: "0.8rem", padding: "10px 24px" }}
                    >
                      OPEN IN NEW TAB
                    </a>
                  </div>
                </object>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
