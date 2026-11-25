"use client";
import { useEffect, useState } from "react";
export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => setP((scrollY / (document.body.scrollHeight - innerHeight)) * 100);
    addEventListener("scroll", f); return () => removeEventListener("scroll", f);
  }, []);
  return <div className="progress" style={{ width: p + "%" }} />;
}
