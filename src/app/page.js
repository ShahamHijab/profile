import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <section id="home" className="h-screen flex justify-center items-center">
        <h1 className="text-5xl neon-link">Welcome to My Neon World</h1>
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
