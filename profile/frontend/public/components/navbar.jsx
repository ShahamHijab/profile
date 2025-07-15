"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scrolled = (scrollY / totalHeight) * 100;
      setScrollPercent(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-lg">
      {/* Scroll Progress Bar */}
      <div className="h-1 bg-pink-500" style={{ width: `${scrollPercent}%` }} />

      {/* Nav Links */}
      <div className="flex justify-center space-x-6 py-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="neon-link text-lg transition duration-300"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
