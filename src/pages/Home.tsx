
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
}
