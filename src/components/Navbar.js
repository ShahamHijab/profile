"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const percent = (scrollY / total) * 100;
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-lg font-[Times_New_Roman]">
      {/* Scroll Progress Bar */}
      <div
        className="h-1 bg-pink-500 transition-all duration-200"
        style={{ width: `${scrollPercent}%` }}
      />

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-center gap-10 py-4">
        {links.map((name) => (
          <a
            key={name}
            href={`#${name.toLowerCase()}`}
            className="neon-link text-lg px-4"
          >
            {name}
          </a>
        ))}
      </div>

      {/* Mobile Toggle Button */}
      <div className="flex md:hidden justify-end items-center px-4 py-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="neon-icon text-3xl"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black text-white transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          {links.map((name) => (
            <a
              key={name}
              href={`#${name.toLowerCase()}`}
              className="neon-link text-lg px-4"
              onClick={() => setIsOpen(false)}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
