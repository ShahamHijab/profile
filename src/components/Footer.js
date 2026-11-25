export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ padding: "5rem 0 8rem", borderTop: "1px solid var(--line)" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <p className="holo" style={{ font: "italic 400 clamp(3.5rem,13vw,10rem)/.9 var(--serif)", letterSpacing: "-.04em" }}>Shaham Hijab</p>
        <p style={{ font: "400 .75rem var(--mono)", color: "var(--mute)", marginTop: "1.5rem" }}>Built with Next.js, Three.js and too much caffeine · © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
