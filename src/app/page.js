"use client";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Cursor = dynamic(() => import("../components/Cursor"), { ssr: false });
const Hero = dynamic(() => import("../components/Hero"), { ssr: false });

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
