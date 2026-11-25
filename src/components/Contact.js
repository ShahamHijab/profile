"use client";
import { useState } from "react";
import Reveal from "./AnimatedSection";
import GlassCard from "./GlassCard";

const lab = { font: "400 .78rem var(--mono)", color: "var(--mute)", display: "block", marginBottom: 8 };
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault(); setStatus("sending"); setErrorMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }); }
      else { setStatus("error"); setErrorMsg(data.error || "Something went wrong."); }
    } catch { setStatus("error"); setErrorMsg("Network error. Please try again."); }
  };
  const F = (name, label, type = "text", ph = "") => (
    <div><label style={lab}>{label}</label><input className="neon-input" name={name} type={type} value={form[name]} onChange={change} required placeholder={ph} /></div>
  );
  return (
    <section id="contact" className="sec" style={{ paddingBottom: "clamp(8rem,16vw,13rem)" }}>
      <div className="wrap" style={{ maxWidth: 820, textAlign: "center" }}>
        <Reveal>
          <div className="kicker" style={{ justifyContent: "center" }}>Contact</div>
          <h2 className="h2" style={{ marginBottom: "1.2rem" }}>Get in <em className="holo">touch.</em></h2>
          <p style={{ color: "var(--mute)", fontSize: "1.05rem", maxWidth: "46ch", margin: "0 auto 2rem" }}>Got a project idea or want to collaborate? Send a message and I&apos;ll reply.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <a className="btn ghost" href="mailto:shahamhijab@proton.me">shahamhijab@proton.me</a>
            <a className="btn ghost" href="https://github.com/ShahamHijab" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <GlassCard tilt={0} style={{ padding: "clamp(1.4rem,4vw,2.6rem)", textAlign: "left" }}>
            <form onSubmit={submit} style={{ display: "grid", gap: 18 }}>
              <div className="grid gap-4 sm:grid-cols-2">{F("name", "Name", "text", "Your name")}{F("email", "Email", "email", "you@email.com")}</div>
              {F("subject", "Subject", "text", "What's this about?")}
              <div><label style={lab}>Message</label><textarea className="neon-input" name="message" rows={5} value={form.message} onChange={change} required placeholder="Tell me about it" style={{ resize: "vertical" }} /></div>
              <button type="submit" className="btn" disabled={status === "sending"} style={{ justifyContent: "center", opacity: status === "sending" ? 0.6 : 1 }}>{status === "sending" ? "Sending…" : "Send message"}</button>
              {status === "success" && <p style={{ textAlign: "center", color: "#3dffa0", font: "400 .85rem var(--mono)" }}>✓ Message sent. I&apos;ll be in touch.</p>}
              {status === "error" && <p style={{ textAlign: "center", color: "var(--pink)", font: "400 .85rem var(--mono)" }}>✗ {errorMsg}</p>}
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
