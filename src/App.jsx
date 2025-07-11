import { useState, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import components directly (no lazy loading for single page)
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [animationName, setAnimationName] = useState("waving");

  useEffect(() => {
    const wavingTimer = setTimeout(() => {
      setAnimationName("idle");
    }, 5000); 

    return () => clearTimeout(wavingTimer);
  }, []);

  useEffect(() => {
    const elements = gsap.utils.toArray(".reveal-up");
    if (elements.length === 0) return;

    elements.forEach((element) => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            // Removed 'once: true' to allow repeated animations
          },
        }
      );
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <Header setAnimationName={setAnimationName} />
      <main>
        <Hero animationName={animationName} />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
    </ReactLenis>
  );
}

export default App;
