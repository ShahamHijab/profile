import Navbar from "../components/Navbar";
import HeroScene from "../components/HeroScene";
import Cursor from "../components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <section id="home" className="relative h-screen overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl neon-link z-10">Welcome to My Neon World</h1>
          <p className="mt-6 text-lg text-white/80 z-10 max-w-2xl">
            Explore the neon scene, hover the menu, and enjoy the interactive cursor ripple effect.
          </p>
        </div>
      </section>
      <section id="about" className="h-screen flex justify-center items-center">
        <h2 className="text-4xl">About Me</h2>
      </section>
      <section id="skills" className="h-screen flex justify-center items-center">
        <h2 className="text-4xl">Skills</h2>
      </section>
      <section id="projects" className="h-screen flex justify-center items-center">
        <h2 className="text-4xl">Projects</h2>
      </section>
      <section id="contact" className="h-screen flex justify-center items-center">
        <h2 className="text-4xl">Contact</h2>
      </section>
    </>
  );
}
