export default function Footer() {
  return (
    <footer
      className="relative py-12 px-6 text-center overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,0,255,0.1)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 50% 100%, rgba(255,0,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <p
          className="gradient-text mb-3"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2rem",
            letterSpacing: "0.2em",
          }}
        >
          SHAHAM HIJAB
        </p>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.2em",
          }}
        >
          BUILT WITH NEXT.JS + THREE.JS + TOO MUCH CAFFEINE
        </p>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.15)",
            marginTop: "8px",
            letterSpacing: "0.15em",
          }}
        >
          © {new Date().getFullYear()} — ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}